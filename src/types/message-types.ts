export interface Message {
	id: number
	type: 'TEXT' | 'FILE'
	content: string
	date: Date
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