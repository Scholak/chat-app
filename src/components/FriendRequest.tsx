'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import Pusher from 'pusher-js'
import { acceptFriendrequest, getFriendrequests } from '@/services/friendService'
import { toast } from 'react-toastify'
import { useMutation, useQuery } from 'react-query'
import { queryClient } from '@/libs/queryClient'

interface FriendRequest {
	id: number
	sender: string
	reciever: string
}

const FriendRequest = () => {
  const { data: session } = useSession()

	if (!session?.user?.email) {
		<div>Please Wait...</div>
	}

	const { data: requests } = useQuery({
		queryKey: ['requests', session?.user?.email],
		queryFn: getFriendrequests,
	})

	const { mutateAsync } = useMutation(acceptFriendrequest, {
		onSuccess: (data, variables, context) => {
			queryClient.invalidateQueries(['requests', session?.user?.email])
			queryClient.invalidateQueries(['friends', session?.user?.email])
		},
		onError: (error: any, variables, context) => {
			toast.error(error.response?.data.message)
		},
	})

	if (session?.user) {
		const pusher = new Pusher('75391d22d9bc1e7960ce', {
			cluster: 'eu',
		})

		const channel = pusher.subscribe('user')
		channel.bind(session.user.email as string, function (data: any) {
			queryClient.invalidateQueries(['friends', session?.user?.email])
		})
	}

  const handleAccept = async (email: string) => {
    await mutateAsync(email)
  }

  return (
		<div>
			<h3 className='text-3xl font-semibold'>Friend Requests</h3>
			<div>
				{requests && requests.map((request: any) => (
					<div key={request.id} className='flex gap-3'>
						<span>{request.sender}</span>
						<button
							className='cursor-pointer'
							onClick={() => handleAccept(request.sender)}
						>
							accept
						</button>
					</div>
				))}
			</div>
		</div>
	)
}

export default FriendRequest
