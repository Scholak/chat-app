import { SendMessageSchema } from '@/types/message-types'
import { z, ZodType } from 'zod'

const errors = {
	required: 'content is required field',
}

export const sendMessageSchema: ZodType<SendMessageSchema> = z.object({
	content: z.string().nonempty(errors.required),
})
