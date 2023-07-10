export interface IMessage {
	id: number
	type: 'TEXT' | 'FILE'
	content: Buffer
	date: string
	from: number
	to: number
}

export interface SendMessageSchema {
  content: string
}

export interface SendMessageRequest {
	type: 'TEXT' | 'FILE'
	content: string
	to: number
}