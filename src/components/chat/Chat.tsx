'use client'

import React, { useState } from 'react'
import MessageScreen from './MessageScreen'
import SendMessageForm from './SendMessageForm'
import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'
import SendFile from './SendImage'

const Chat = () => {
	const id = useSelector((state: RootState) => state.chat.id)

	const [file, setFile] = useState<File | null>()
	const [preview, setPreview] = useState<string>('')

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
		<div className='chat relative w-full flex flex-col justify-between bg-slate-900'>
			<MessageScreen />
			<SendMessageForm setPreview={setPreview} setFile={setFile} />
			{preview && (
				<SendFile
					file={file || null}
					preview={preview}
					setFile={setFile}
					setPreview={setPreview}
				/>
			)}
		</div>
	)
}

export default Chat
