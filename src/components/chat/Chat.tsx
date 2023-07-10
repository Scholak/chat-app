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
			<div className='h-screen flex bg-slate-900 text-white'>
				<h3 className='m-auto text-4xl text-center font-bold'>
					Start new conversation or continue existing one
				</h3>
			</div>
		)
	}

  return (
		<div className='chat flex flex-col justify-between bg-slate-900'>
			<MessageScreen />
			<SendMessageForm />
		</div>
	)
}

export default Chat
