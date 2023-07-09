'use client'

import React from 'react'
import { useSession, signOut } from 'next-auth/react'
import { FaSignOutAlt } from 'react-icons/fa'

const Profile = () => {
  const { data: session } = useSession()

  return (
		<div className='m-3 p-3 flex gap-4 items-center rounded-md shadow bg-white'>
			<img
				src={session?.user.image}
				className='w-10 h-10 rounded-full overflow-hidden'
			/>
			<div className='flex flex-col justify-between'>
				<strong>{session?.user.email}</strong>
				<button
					onClick={() => signOut()}
					className='flex gap-2 items-center text-lg text-red-600 cursor-pointer'
				>
					<span>logout</span>
          <FaSignOutAlt />
				</button>
			</div>
		</div>
	)
}

export default Profile
