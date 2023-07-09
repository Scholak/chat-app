import React from 'react'
import MessageScreen from './MessageScreen'
import SendMessageForm from './SendMessageForm'

const Chat = () => {
  return (
		<div className='h-screen flex flex-col justify-between bg-blue-200'>
			<MessageScreen />
			<SendMessageForm />
		</div>
	)
}

export default Chat
