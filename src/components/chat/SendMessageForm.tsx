'use client'

import { queryClient } from '@/libs/queryClient'
import { sendMessage } from '@/services/messageService'
import { RootState } from '@/store/store'
import { SendMessageRequest, SendMessageSchema } from '@/types/message-types'
import { sendMessageSchema } from '@/validations/sendMessageSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useSelector } from 'react-redux'

const SendMessageForm = () => {
	const { mutateAsync } = useMutation(sendMessage)
	const id = useSelector((state: RootState) => state.chat.id)

	const { register, handleSubmit } = useForm<SendMessageSchema>({
		resolver: zodResolver(sendMessageSchema)
	})

	const onSubmit = async (data: SendMessageSchema) => {
		await mutateAsync({ content: data.content, to: id, type: 'TEXT' } as SendMessageRequest, {
			onSuccess: (data, variables, context) => {
				queryClient.invalidateQueries(['messages'])
			},
		})
	}

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input type="text" {...register('content')} placeholder='type...' />
				<button type='submit'>send</button>
			</form>
		</div>
	)
}

export default SendMessageForm
