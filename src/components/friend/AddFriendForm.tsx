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

  const { register, handleSubmit, formState: { errors }, reset } = useForm<AddFriendSchema>({
    resolver: zodResolver(addFriendSchema)
  })

  const onSubmit = async (data: AddFriendSchema) => {
      await mutateAsync(data, {
				onSuccess: (data, variables, context) => {
					toast.success(data.message)
					reset()
				},
				onError: (error: any, variables, context) => {
					toast.error(error.response?.data.message)
				}
			})
  }

  return (
		<div className='mx-3 p-3 bg-white rounded-md shadow'>
			<h3 className='mb-2 text-xl font-bold'>Add New Friend</h3>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='flex items-stretch'>
					<input
						type='email'
						{...register('email')}
						placeholder='type email...'
						className='px-1 border border-green-600 rounded-s outline-none'
					/>
					<button
						type='submit'
						className='w-full py-1 text-center bg-green-600 text-white rounded-e'
					>
						add
					</button>
				</div>
				{errors.email && <p className='mt-1 text-red-500'>{errors.email.message}</p>}
			</form>
		</div>
	)
}

export default AddFriendForm
