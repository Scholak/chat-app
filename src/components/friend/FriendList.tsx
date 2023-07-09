'use client'

import { getFriends } from '@/services/friendService'
import { changeChat } from '@/store/slices/chatSlice'
import { RootState } from '@/store/store'
import { useSession } from 'next-auth/react'
import React from 'react'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'

const FriendList = () => {
  const { data: session } = useSession()

	const id = useSelector((state: RootState) => state.chat.id)

  const dispatch = useDispatch()

  if(!session?.user?.email) {
    <div>Please Wait...</div>
  }

  const { data: friends, isLoading } = useQuery({
    queryKey: ['friends', session?.user.email],
    queryFn: getFriends
  })

  const handleChangeChat = (id: number) => {
    dispatch(changeChat(id))
  }

  return (
		<div className='mx-3'>
			<h3 className='mt-4 mb-2 text-xl font-bold'>Friends</h3>
			<div>
				{isLoading ? (
					<div className='text-blue-500'>loading...</div>
				) : (
					friends?.map((friend: any) => (
						<div
							key={friend.id}
							className={`flex items-center gap-3 mb-3 p-3 bg-white rounded-md cursor-pointer ${id === friend.id ? 'shadow-lg' : ''}`}
							onClick={() => handleChangeChat(friend.id)}
						>
							<img
								src={friend.picture}
								className='w-10 h-10 rounded-full overflow-hidden'
							/>
							<span className={id === friend.id ? 'font-bold' : ''}>
								{friend.email}
							</span>
						</div>
					))
				)}
			</div>
		</div>
	)
}

export default FriendList
