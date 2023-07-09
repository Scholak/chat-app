'use client'

import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify'
import { QueryClientProvider } from 'react-query'
import 'react-toastify/dist/ReactToastify.css'
import { queryClient } from '@/libs/queryClient'
import { Provider } from 'react-redux'
import { store } from '@/store/store'

interface Props {
  children: React.ReactNode
}

const ClientProviders = ({children}: Props) => {
  return (
		<SessionProvider>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<ToastContainer />
					{children}
				</QueryClientProvider>
			</Provider>
		</SessionProvider>
	)
}

export default ClientProviders
