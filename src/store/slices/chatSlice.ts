import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ChatState {
	email: string
}

const initialState: ChatState = {
	email: '',
}

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		changeEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload
		},
	},
})

export const { changeEmail } = chatSlice.actions

export default chatSlice.reducer
