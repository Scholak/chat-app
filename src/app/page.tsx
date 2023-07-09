import Profile from '@/components/Profile'
import AddFriendForm from '@/components/friend/AddFriendForm'
import FriendList from '@/components/friend/FriendList'
import FriendRequest from '@/components/friend/FriendRequest'
import React from 'react'

const Home = () => {
  return (
		<div>
			<Profile />
			<AddFriendForm />
			<FriendRequest />
			<FriendList />
		</div>
	)
}

export default Home
