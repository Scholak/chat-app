import { AddFriendSchema } from '@/types/friend-types'
import { z, ZodType } from 'zod'

const errors = {
  required: 'email is required field',
  email: 'email must be valid'
}

export const addFriendSchema: ZodType<AddFriendSchema> = z.object({
  email: z.string().nonempty(errors.required).email(errors.email)
})