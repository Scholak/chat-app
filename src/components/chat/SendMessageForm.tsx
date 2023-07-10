'use client'

import { queryClient } from '@/libs/queryClient'
import { sendMessage } from '@/services/messageService'
import { RootState } from '@/store/store'
import { ISendMessageRequest, ISendMessageSchema } from '@/types/message-types'
import { sendMessageSchema } from '@/validations/sendMessageSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { FaArrowRight } from 'react-icons/fa'
import { useMutation } from 'react-query'
import { useSelector } from 'react-redux'

const SendMessageForm = () => {
	const { mutateAsync } = useMutation(sendMessage)
	const id = useSelector((state: RootState) => state.chat.id)

	const { register, handleSubmit, reset } = useForm<ISendMessageSchema>({
		resolver: zodResolver(sendMessageSchema),
	})

	const onSubmit = async (data: ISendMessageSchema) => {
		await mutateAsync({ content: data.content, to: id, type: 'TEXT' } as ISendMessageRequest, {
			onSuccess: (data, variables, context) => {
				reset()
				queryClient.invalidateQueries(['messages', id])
			},
		})
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='w-full px-5 flex items-stretch gap-3 rounded-full bg-white'
		>
			<textarea
			rows={1}
				{...register('content')}
				placeholder='type message...'
				className='flex-1 py-3 px-6 rounded-s-full outline-none'
			></textarea>
			<button type='submit' className='rounded-e-full'>
				<FaArrowRight className='text-xl font-bold text-neutral-900' />
			</button>
		</form>
	)
}

export default SendMessageForm
