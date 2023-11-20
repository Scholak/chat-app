import { IFriend } from '@/types/friend-types'
import { IMessage } from '@/types/message-types'
import dayjs from 'dayjs'
import React from 'react'
import DeleteButton from './DeleteButton'
import Image from 'next/image'

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
				<Image
					unoptimized
					width={40}
					height={40}
					src={image}
					alt='user profile'
					className='shrink-0 rounded-full overflow-hidden border border-white'
				/>
				<div>
					{message.type === 'TEXT' ? (
						<p className='py-1 px-2 rounded-lg bg-white shadow-sm shadow-white text-left text-neutral-900 leading-relaxing break-all md:py-3 md:px-6'>
							{message.content}
						</p>
					) : (
						<Image unoptimized width={1000} height={1000} src={message.content as any} alt='message image' />
					)}
					<div className='flex items-center gap-4 text-gray-100'>
						<span className='text-sm '>{dayjs(message.date).format('MMM DD - HH:m')}</span>
						{message.from === authId && <DeleteButton messageId={message.id} />}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Message
