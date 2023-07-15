'use client'

import { deleteMessage } from '@/services/messageService'
import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

interface Props {
	messageId: number
}

const DeleteButton = ({ messageId }: Props) => {
  const { mutateAsync } = useMutation(deleteMessage, {
    onSuccess: (data, variables, context) => {
      toast.success('message deleted successfully')
    }
  })

  const handleDelete = async () => {
    await mutateAsync(messageId)
  }

  return (
		<div>
			<FaTrash className='mt-1 text-sm text-red-600 cursor-pointer' onClick={() => handleDelete()} />
		</div>
	)
}

export default DeleteButton
