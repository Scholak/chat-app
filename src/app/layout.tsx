import ClientProviders from '@/providers/ClientProviders'
import './globals.css'
import type { Metadata } from 'next'
import Chat from '@/components/chat/Chat'

export const metadata: Metadata = {
  title: 'Chat App',
  description: 'chat app using nextjs and pusher',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
		<html lang='en'>
			<body suppressHydrationWarning={true}>
				<ClientProviders>
					<main className='grid grid-cols-4'>
						<div className='min-h-screen border-r border-slate-700 bg-slate-200'>
							{children}
						</div>
						<div className='col-span-3'>
							<Chat />
						</div>
					</main>
				</ClientProviders>
			</body>
		</html>
	)
}
