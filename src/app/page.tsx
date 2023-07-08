'use client'

import { useSession, signOut } from 'next-auth/react'
import React from 'react'

const Home = () => {
  const { data: session } = useSession()

  return (
		<div>
			<p className='mb-2'>Chat app</p>
			{session?.user && (
				<>
					<p className='mb-2'>
						signed as <strong>{session.user.email}</strong>
					</p>
					<span
						onClick={() => signOut()}
						className='p-2 bg-blue-500 text-white cursor-pointer'
					>
						sign Out
					</span>
				</>
			)}
		</div>
	)
}

export default Home
