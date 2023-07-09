'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addFriendSchema } from '@/validations/addFriendSchema'
import { AddFriendSchema } from '@/types/friend-types'
import { addFriendrequest } from '@/services/friendService'
import { toast } from 'react-toastify'
import { useMutation } from 'react-query'

const AddFriendForm = () => {
	const { mutateAsync } = useMutation(addFriendrequest)

  const { register, handleSubmit, formState: { errors } } = useForm<AddFriendSchema>({
    resolver: zodResolver(addFriendSchema)
  })

  const onSubmit = async (data: AddFriendSchema) => {
      await mutateAsync(data, {
				onSuccess: (data, variables, context) => {
					toast.success(data.message)
				},
				onError: (error: any, variables, context) => {
					toast.error(error.response?.data.message)
				}
			})
  }

  return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='flex items-stretch'>
				<input
					type='email'
					{...register('email')}
					placeholder='type email...'
					className='px-2 rounded-s border border-slate-700 outline-none'
				/>
				<button
					type='submit'
					className='py-2 px-4 bg-green-600 text-white rounded-e'
				>
					add
				</button>
			</div>
			{errors.email && <p className='text-red-500'>{errors.email.message}</p>}
		</form>
	)
}

export default AddFriendForm
