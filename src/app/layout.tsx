import ClientProviders from '@/providers/ClientProviders'
import './globals.css'
import type { Metadata } from 'next'

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
						<div className='min-h-screen bg-slate-50 border-r border-slate-700'>{children}</div>
						<div className='row-span-3'>Chat</div>
					</main>
				</ClientProviders>
			</body>
		</html>
	)
}
