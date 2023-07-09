'use client'

import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify'
import { QueryClientProvider } from 'react-query'
import 'react-toastify/dist/ReactToastify.css'
import { queryClient } from '@/libs/queryClient'

interface Props {
  children: React.ReactNode
}

const ClientProviders = ({children}: Props) => {
  return (
		<SessionProvider>
			<QueryClientProvider client={queryClient}>
				<ToastContainer />
				{children}
			</QueryClientProvider>
		</SessionProvider>
	)
}

export default ClientProviders
