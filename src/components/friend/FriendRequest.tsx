'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import { acceptFriendrequest, declineFriendrequest, getFriendrequests } from '@/services/friendService'
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
		queryFn: getFriendrequests,
	})

	const { mutateAsync: acceptMutateAsync } = useMutation(acceptFriendrequest, {
		onSuccess: (data, variables, context) => {
			queryClient.invalidateQueries(['requests', session?.user?.email])
			queryClient.invalidateQueries(['friends', session?.user?.email])
		},
		onError: (error: any, variables, context) => {
			toast.error(error.response?.data.message)
		},
	})

	const { mutateAsync: declineMutateAsync } = useMutation(declineFriendrequest, {
		onSuccess: (data, variables, context) => {
			queryClient.invalidateQueries(['requests', session?.user?.email])
			queryClient.invalidateQueries(['friends', session?.user?.email])
		},
		onError: (error: any, variables, context) => {
			toast.error(error.response?.data.message)
		},
	})

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
		<div className='mt-4 mx-3 p-3 rounded-md bg-white shadow'>
			<h3 className='mb-2 text-xl font-bold'>Incoming Requests</h3>
			<div className='mr-3'>
				{requests?.length > 0 ?
					requests.map((request: any) => (
						<div
							key={request.id}
							className='flex justify-between items-center mb-3 p-2 rounded bg-white'
						>
							<span>{request.sender}</span>
							<div>
								<button
									className='py-1 px-2 rounded cursor-pointer bg-blue-500 text-white'
									onClick={() => handleAccept(request.sender)}
								>
									accept
								</button>
								<button
									className='ml-3 py-1 px-2 rounded cursor-pointer bg-red-500 text-white'
									onClick={() => handleDecline(request.sender)}
								>
									decline
								</button>
							</div>
						</div>
					)) : (
						<p className='font-medium text-blue-500'>there is no friend request</p>
					)}
			</div>
		</div>
	)
}

export default FriendRequest
