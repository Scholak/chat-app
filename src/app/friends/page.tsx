import AddFriendForm from '@/components/AddFriendForm'
import FriendList from '@/components/FriendList'
import FriendRequest from '@/components/FriendRequest'
import React from 'react'

const Friends = () => {
	return (
		<div>
			<h2 className='text-4xl font-bold'>Friends</h2>
			<AddFriendForm />
			<FriendRequest />
      <FriendList />
		</div>
	)
}

export default Friends
