'use client'

import { queryClient } from '@/libs/queryClient'
import { getMessages } from '@/services/messageService'
import { Message } from '@/types/message-types'
import { useSession } from 'next-auth/react'
import Pusher from 'pusher-js'
import React from 'react'
import { useQuery } from 'react-query'

const MessageScreen = () => {
  const { data: session } = useSession()

  if(!session?.user?.email) {
    <div>Loading...</div>
  }

  const pusher = new Pusher('75391d22d9bc1e7960ce', {
		cluster: 'eu',
	})

	const channel = pusher.subscribe('chat')
	channel.bind('message', function (data: any) {
		queryClient.invalidateQueries(['messages'])
	})

  const { data: messages, isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: getMessages
  })

  return (
    <div>
    {isLoading ? <span className='text-blue-500'>messages fetching...</span> : messages.map((message: Message) => (
      <p key={message.id} className={message.from === session?.user?.email ? 'text-left' : 'text-right'}>
        {message.content}
      </p>
    ))}
    </div>
  )
}

export default MessageScreen
