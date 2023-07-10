'use client'

import { pusherClient } from '@/libs/pusherClient'
import { queryClient } from '@/libs/queryClient'
import { getMessages } from '@/services/messageService'
import { RootState } from '@/store/store'
import { IMessage } from '@/types/message-types'
import { useSession } from 'next-auth/react'
import React from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import Message from '@/components/chat/Message'
import { getFriendById } from '@/services/friendService'

const MessageScreen = () => {
  const { data: session } = useSession()

  const id = useSelector((state: RootState) => state.chat.id)

  if(!session?.user?.email) {
    <div>Loading...</div>
  }

	const channel = pusherClient.subscribe('chat')

  let room: string

  if (Number(session?.user.id) < id) {
    room = `${Number(session?.user.id)}_${id}`
  } else {
    room = `${id}_${Number(session?.user.id)}`
  }

	channel.bind(room, function (data: any) {
		queryClient.invalidateQueries(['messages'])
	})

  const { data: messages, isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: getMessages
  })

  const { data: friend, isLoading: isFriendLoading } = useQuery({
    queryKey: ['friend', id],
    queryFn: () => getFriendById(id)
  })

  if (isFriendLoading) {
    return <p className='text-blue-500 font-semibold'>friend profile fetching...</p>
  }

  return (
    <div className='scroll-to-bottom-auto p-4 overflow-y-auto'>
    {isLoading ? 
      <span className='text-blue-500'>messages fetching...</span> : messages.map((message: IMessage) => (
        <Message key={message.id} message={message} authId={session?.user.id as number} authImage={session?.user.image as string} friend={friend} />
      ))
    }
    </div>
  )
}

export default MessageScreen
