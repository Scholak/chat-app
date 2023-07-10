'use client'

import Burger from '@/components/Burger'
import Profile from '@/components/Profile'
import AddFriendForm from '@/components/friend/AddFriendForm'
import FriendList from '@/components/friend/FriendList'
import FriendRequest from '@/components/friend/FriendRequest'
import React, { useRef } from 'react'

export const revalidate = 0

const ChatPage = () => {
	const divEl = useRef<HTMLDivElement>(null)

	const handleToggle = () => {
		divEl.current?.classList.toggle('translate-x-0')
		divEl.current?.classList.toggle('-translate-x-full')
	}

	return (
		<>
			<Burger handleToggle={handleToggle} />
			<div
				className='absolute min-h-screen border-r border-gray-300 bg-slate-800 -translate-x-full transition duration-300 z-10 xl:static xl:translate-x-0'
				ref={divEl}
				onClick={handleToggle}
			>
				<Profile />
				<AddFriendForm />
				<FriendRequest />
				<FriendList />
			</div>
		</>
	)
}

export default ChatPage
