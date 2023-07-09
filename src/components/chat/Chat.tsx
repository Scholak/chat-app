'use client'

import React from 'react'
import MessageScreen from './MessageScreen'
import SendMessageForm from './SendMessageForm'
import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'

const Chat = () => {
	const id = useSelector((state: RootState) => state.chat.id)

	if(id === 0) {
		return (
			<div className='h-screen bg-blue-200'>
				<h3 className='text-4xl font-bold'>
					Start new conversation or continue existing one
				</h3>
			</div>
		)
	}

  return (
		<div className='h-screen flex flex-col justify-between bg-blue-200'>
			<MessageScreen />
			<SendMessageForm />
		</div>
	)
}

export default Chat
