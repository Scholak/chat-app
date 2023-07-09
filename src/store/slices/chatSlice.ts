import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ChatState {
	id: number
}

const initialState: ChatState = {
	id: 0,
}

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		changeChat: (state, action: PayloadAction<number>) => {
			state.id = action.payload
		},
	},
})

export const { changeChat } = chatSlice.actions

export default chatSlice.reducer
