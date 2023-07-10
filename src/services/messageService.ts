import { ISendMessageRequest } from '@/types/message-types'
import { api } from './api';

export const getMessages = async () => {
  const res = await api.get('/message')
  return res.data
}

export const sendMessage = async (data: ISendMessageRequest) => {
	const res = await api.post('/message', data)
	return res.data
}