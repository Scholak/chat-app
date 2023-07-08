import NextAuth from 'next-auth'

declare module 'next-auth' {
	interface Profile {
		email: string,
    picture: string
	}
}
