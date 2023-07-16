'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import { acceptFriendRequest, declineFriendRequest, getFriendRequests } from '@/services/friendService'
import { toast } from 'react-toastify'
import { useMutation, useQuery } from 'react-query'
import { queryClient } from '@/libs/queryClient'
import { pusherClient } from '@/libs/pusherClient'

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
		queryFn: getFriendRequests,
	})

	const { mutateAsync: acceptMutateAsync } = useMutation(acceptFriendRequest, {
		onSuccess: (data, variables, context) => {
			queryClient.invalidateQueries(['requests', session?.user?.email])
			queryClient.invalidateQueries(['friends', session?.user?.email])
		},
		onError: (error: any, variables, context) => {
			toast.error(error.response?.data.message)
		},
	})

	const { mutateAsync: declineMutateAsync } = useMutation(declineFriendRequest, {
		onSuccess: (data, variables, context) => {
			queryClient.invalidateQueries(['requests', session?.user?.email])
			queryClient.invalidateQueries(['friends', session?.user?.email])
		},
		onError: (error: any, variables, context) => {
			toast.error(error.response?.data.message)
		},
		}
	)

	if (session?.user) {
		const channel = pusherClient.subscribe('user')
		channel.bind(session.user.email as string, function (data: any) {
			queryClient.invalidateQueries(['friends', session?.user?.email])
		})
	}

  const handleAccept = async (email: string) => {
    await acceptMutateAsync(email)
  }

	const handleDecline = async (email: string) => {
		await declineMutateAsync(email)
	}

  return (
		<div className='my-4 mx-3 rounded-md text-white shadow'>
			<h3 className='mb-2 text-xl font-bold'>Incoming Requests</h3>
			<div className='grid gap-4'>
				{requests ? (
					requests.map((request: any) => (
						<div key={request.id} className='flex items-center justify-between'>
							<span>{request.sender}</span>
							<div className='flex gap-6'>
								<button
									className='py-1 px-2 rounded cursor-pointer bg-blue-500 text-white'
									onClick={() => handleAccept(request.sender)}
								>
									accept
								</button>
								<button
									className='py-1 px-2 rounded cursor-pointer bg-red-500 text-white'
									onClick={() => handleDecline(request.sender)}
								>
									decline
								</button>
							</div>
						</div>
					))
				) : (
					<p className='font-medium text-blue-400'>
						there is no friend request
					</p>
				)}
			</div>
		</div>
	)
}

export default FriendRequest
