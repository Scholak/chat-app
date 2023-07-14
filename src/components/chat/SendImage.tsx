'use client'

import { RootState } from '@/store/store'
import axios from 'axios'
import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { useSelector } from 'react-redux'

interface Props {
	file: File | null
	preview: string
	setFile: (file: File | null) => void
	setPreview: (preview: string) => void
}

const SendImage = ({ file, preview, setFile, setPreview }: Props) => {
	const id = useSelector((state: RootState) => state.chat.id)

	const handleClose = () => {
		setPreview('')
		setFile(null)
	}

	const handleSend = async () => {
		const formData = new FormData()
		formData.append('file', file as any)

		setPreview('')
		setFile(null)

		await axios.post(`/api/${id.toString()}/file`, formData)
	}
	
	return (
		<div className='absolute inset-0 bg-black'>
			<button
				className='absolute top-4 right-4 w-8 h-8 inline-flex text-red-600 bg-white rounded-full cursor-pointer z-50'
				onClick={handleClose}
			>
				<FaTimes className='m-auto' />
			</button>
			<img
				src={preview}
				alt='preview'
				className='mx-auto max-w-full max-h-full'
			/>
			<div
				className='fixed bottom-6 right-6 rounded-md bg-slate-900 text-white text-center py-3 px-6 cursor-pointer border border-white z-50'
				onClick={handleSend}
			>
				send
			</div>
		</div>
	)
}

export default SendImage
