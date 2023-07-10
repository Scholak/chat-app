'use client'

import { getFriends } from '@/services/friendService'
import { useSession } from 'next-auth/react'
import React from 'react'
import { useQuery } from 'react-query'
import Friend from './Friend'
import { IFriend } from '@/types/friend-types'

const FriendList = () => {
  const { data: session } = useSession()

  if(!session?.user?.email) {
    <div>Please Wait...</div>
  }

  const { data: friends, isLoading } = useQuery({
    queryKey: ['friends', session?.user.email],
    queryFn: getFriends
  })

  return (
		<div className='mx-3'>
			<h3 className='mt-4 mb-2 text-xl font-bold text-white'>Friends</h3>
			<div>
				{isLoading ? (
					<div className='text-blue-500'>loading...</div>
				) : (
					friends?.map((friend: IFriend) => (
						<Friend friend={friend} />
					))
				)}
			</div>
		</div>
	)
}

export default FriendList
