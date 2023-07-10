import Chat from '@/components/chat/Chat'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const ChatLayout = ({ children }: Props) => {
  return (
		<main className='grid grid-cols-4'>
			<div className='min-h-screen border-r border-gray-300 bg-slate-800'>
				{children}
			</div>
			<div className='col-span-3'>
				<Chat />
			</div>
		</main>
	)
}

export default ChatLayout
