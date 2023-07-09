export interface Message {
	id: number
	type: 'TEXT' | 'FILE'
	content: string
	date: Date
	from: string
	to: string
}

export interface SendMessageSchema {
  content: string
}

export interface SendMessageRequest {
	type: 'TEXT' | 'FILE'
	content: string
	to: string
}