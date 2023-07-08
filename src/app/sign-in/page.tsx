'use client'

import React from 'react'
import { signIn } from 'next-auth/react'
import { FaGoogle } from 'react-icons/fa'

const Home = () => {
  return (
		<div className='h-screen flex flex-col items-center justify-center'>
			<h1 className='mb-4 text-4xl text-center font-bold'>
				Sign In Using Google Account
			</h1>
			<button
				onClick={() => signIn('google')}
				className='flex gap-4  items-center py-3 px-8 bg-blue-500 text-white text-lg text-medium rounded-md tracking-wide'
			>
				sign in with <FaGoogle />
			</button>
		</div>
	)
}

export default Home
