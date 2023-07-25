'use client'

import { changeChat } from '@/store/slices/chatSlice'
import { RootState } from '@/store/store'
import { IFriend } from '@/types/friend-types'
import Image from 'next/image'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface Props {
	friend: IFriend
}

const Friend = ({ friend }: Props) => {
  const id = useSelector((state: RootState) => state.chat.id)

  const dispatch = useDispatch()

  const handleChangeChat = (id: number) => {
		dispatch(changeChat(id))
	}
  
  return (
		<div
			className={`flex items-center gap-3 mb-3 p-3 bg-white text-blue-500 rounded-md cursor-pointer ${
				id === friend.id ? 'shadow-lg' : ''
			}`}
			onClick={() => handleChangeChat(friend.id)}
		>
			<Image
				width={40}
				height={40}
				src={friend.picture}
				alt='friend picture'
				className='rounded-full overflow-hidden'
			/>
			<span className={id === friend.id ? 'font-bold' : ''}>
				{friend.email}
			</span>
		</div>
	)
}

export default Friend
