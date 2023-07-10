import { IFriend } from '@/types/friend-types'
import { IMessage } from '@/types/message-types'
import dayjs from 'dayjs'
import React from 'react'

interface Props {
  message: IMessage
  authId: number
  authImage: string
  friend: IFriend
}

const Message = ({ message, authId, authImage, friend }: Props) => {
	const alignment = message.from === authId ? 'text-left' : 'text-right'
	const direction = message.from === authId ? 'row' : 'flex-row-reverse'
  const image = message.from === authId ? authImage : friend.picture

	return (
		<div className={`mb-3 ${alignment}`}>
			<div className={`w-4/5 inline-flex ${direction} items-start gap-1 md:gap-3`}>
				<img
					src={image}
					className='shrink-0 w-8 h-8 rounded-full overflow-hidden border border-white'
				/>
				<div>
					<p className='py-1 px-2 rounded-lg bg-white shadow-sm shadow-white text-left text-neutral-900 leading-relaxing break-all md:py-3 md:px-6'>
						{message.content}
					</p>
					<span className='text-sm text-gray-100'>
						{dayjs(message.date).format('MMM DD - HH:m')}
					</span>
				</div>
			</div>
		</div>
	)
}

export default Message
