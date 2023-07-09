import NextAuth from 'next-auth'

declare module 'next-auth' {
	interface Profile {
		id: number
		email: string,
    picture: string
	}
}
