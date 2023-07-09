'use client'

import { getFriends } from '@/services/friendService'
import { changeEmail } from '@/store/slices/chatSlice'
import { Friend } from '@prisma/client'
import { useSession } from 'next-auth/react'
import React from 'react'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'

const FriendList = () => {
  const { data: session } = useSession()

  const dispatch = useDispatch()

  if(!session?.user?.email) {
    <div>Please Wait...</div>
  }

  const { data: friends, isLoading } = useQuery({
    queryKey: ['friends', session?.user?.email],
    queryFn: getFriends
  })

  const handleChangeChat = (email: string) => {
    dispatch(changeEmail(email))
  }

  return (
		<div>
			<h3 className='mt-4 mb-2 text-3xl font-semibold'>Friends</h3>
      <div>
      {isLoading ? <div className='text-blue-500'>loading...</div>  : friends?.map((friend: Friend) => (
        <div key={friend.id} className='pb-1 border-b border-slate-700' onClick={() => handleChangeChat(friend.userTwo)}>{friend.userTwo}</div>
      ))}
      </div>
		</div>
	)
}

export default FriendList
