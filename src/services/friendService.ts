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

export const getFriendrequests = async () => {
	const res = await api.get('/friends/request')
	return res.data
}

export const addFriendrequest = async (data: IAddFriendSchema) => {
  const res = await api.post('/friends/request', data)
  return res.data
}

export const acceptFriendrequest = async (senderEmail: string) => {
	const res = await api.post('/friends/accept', { senderEmail })
	return res.data
}

export const declineFriendrequest = async (senderEmail: string) => {
	const res = await api.post('/friends/decline', { senderEmail })
	return res.data
}