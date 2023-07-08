import React from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

interface Props {
  children: React.ReactNode
}

const SignInLayout = async ({ children }: Props) => {
  const session = await getServerSession()

  if(session) {
    redirect('/')
  }

	return <>{children}</>
}

export default SignInLayout
