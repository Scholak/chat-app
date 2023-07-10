export interface IMessage {
	id: number
	type: 'TEXT' | 'FILE'
	content: Buffer
	date: string
	from: number
	to: number
}

export interface ISendMessageSchema {
  content: string
}

export interface ISendMessageRequest {
	type: 'TEXT' | 'FILE'
	content: string
	to: number
}