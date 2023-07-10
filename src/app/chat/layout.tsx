import Chat from '@/components/chat/Chat'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const ChatLayout = ({ children }: Props) => {
  return (
		<main className='xl:grid xl:grid-cols-4'>
			{children}
			<div className='xl:col-span-3'>
				<Chat />
			</div>
		</main>
	)
}

export default ChatLayout
