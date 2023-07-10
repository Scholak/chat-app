import { ISendMessageRequest } from '@/types/message-types'
import axios from "axios";

export const getMessages = async () => {
  const res = await axios.get('http://localhost:3000/api/message')
  return res.data
}

export const sendMessage = async (data: ISendMessageRequest) => {
	const res = await axios.post('http://localhost:3000/api/message', data)
	return res.data
}