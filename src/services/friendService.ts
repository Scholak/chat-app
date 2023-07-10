import { AddFriendSchema } from '@/types/friend-types'
import axios from 'axios'

export const getFriends = async () => {
	const res = await axios.get('http://localhost:3000/api/friends')
	return res.data
}

export const getFriendById = async (id: number) => {
	const res = await axios.get(`http://localhost:3000/api/friends/${id}`)
	return res.data
}

export const getFriendrequests = async () => {
	const res = await axios.get('http://localhost:3000/api/friends/request')
	return res.data
}

export const addFriendrequest = async (data: AddFriendSchema) => {
  const res = await axios.post('http://localhost:3000/api/friends/request', data)
  return res.data
}

export const acceptFriendrequest = async (senderEmail: string) => {
	const res = await axios.post('http://localhost:3000/api/friends/accept', {senderEmail})
	return res.data
}

export const declineFriendrequest = async (senderEmail: string) => {
	const res = await axios.post('http://localhost:3000/api/friends/decline', {senderEmail})
	return res.data
}