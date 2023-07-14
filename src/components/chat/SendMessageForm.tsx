'use client'

import { queryClient } from '@/libs/queryClient'
import { sendMessage } from '@/services/messageService'
import { RootState } from '@/store/store'
import { ISendMessageRequest, ISendMessageSchema } from '@/types/message-types'
import { sendMessageSchema } from '@/validations/sendMessageSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { FaArrowRight, FaPlus } from 'react-icons/fa'
import { useMutation } from 'react-query'
import { useSelector } from 'react-redux'

interface Props {
	setPreview: (path: string) => void
	setFile: (file: File) => void
}

const SendMessageForm = ({ setPreview, setFile }: Props) => {
	const { mutateAsync } = useMutation(sendMessage)
	const id = useSelector((state: RootState) => state.chat.id)

	const { register, handleSubmit, reset } = useForm<ISendMessageSchema>({
		resolver: zodResolver(sendMessageSchema),
	})

	const onSubmit = async (data: ISendMessageSchema) => {
		await mutateAsync(
			{ content: data.content, to: id, type: 'TEXT' } as ISendMessageRequest,
			{
				onSuccess: (data, variables, context) => {
					reset()
					queryClient.invalidateQueries(['messages', id])
				},
			}
		)
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if(e.target.files) {
			setPreview(URL.createObjectURL(e.target.files[0]))
			setFile(e.target.files[0])
		}
	}

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='w-full px-5 flex items-center gap-3 rounded-full bg-white'
			>
				<textarea
					rows={1}
					{...register('content')}
					placeholder='type message...'
					className='flex-1 py-3 px-6 rounded-s-full outline-none'
				></textarea>
				<label htmlFor='file'>
					<FaPlus className='w-8 h-8 p-1 rounded-full flex justify-center items-center text-white bg-green-600 cursor-pointer' />
				</label>
				<button type='submit' className='rounded-e-full'>
					<FaArrowRight className='text-xl font-bold text-neutral-900' />
				</button>
			</form>
			<input
				type='file'
				id='file'
				name='file'
				className='hidden'
				onChange={handleChange}
			/>
		</>
	)
}

export default SendMessageForm
