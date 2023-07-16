import { IAddFriendSchema } from '@/types/friend-types'
import { api } from './api'

export const getFriends = async () => {
	const res = await api.get('/friends')
	return res.data
}

export const getFriendById = async (id: number) => {
	const res = await api.get(`/friends/${id}`)
	return res.data
}

export const getFriendRequests = async () => {
	const res = await api.get('/friends/request')
	return res.data
}

export const addFriendRequest = async (data: IAddFriendSchema) => {
  const res = await api.post('/friends/request', data)
  return res.data
}

export const acceptFriendRequest = async (senderEmail: string) => {
	const res = await api.post('/friends/accept', { senderEmail })
	return res.data
}

export const declineFriendRequest = async (senderEmail: string) => {
	const res = await api.post('/friends/decline', { senderEmail })
	return res.data
}