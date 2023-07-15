import { ISendMessageRequest } from '@/types/message-types'
import { api } from './api';

export const getMessages = async (id: number) => {
  const res = await api.get(`/message/${id}`)
  return res.data
}

export const sendMessage = async (data: ISendMessageRequest) => {
	const res = await api.post('/message', data)
	return res.data
}

export const deleteMessage = async (messageId: number) => {
  const res = await api.delete(`/message/${messageId}`)
  return res.data
}