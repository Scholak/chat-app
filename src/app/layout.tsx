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
    <html lang="en">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}
