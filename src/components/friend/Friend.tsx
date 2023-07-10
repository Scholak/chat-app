'use client'

import { changeChat } from '@/store/slices/chatSlice'
import { RootState } from '@/store/store'
import { IFriend } from '@/types/friend-types'
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
      className={`flex items-center gap-3 mb-3 p-3 bg-white text-blue-500 rounded-md cursor-pointer ${id === friend.id ? 'shadow-lg' : ''}`}
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
  )
}

export default Friend
