import { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import db from "./db";

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	callbacks: {
		async jwt({token, profile}) {
			if(profile?.email && profile?.picture) {
				const existingUser = await db.user.findFirst({
					where: { email: profile.email },
				})

				if (!existingUser) {
					const createdUser = await db.user.create({
						data: {
							email: profile.email,
							picture: profile.picture,
						},
					})
					token.id = createdUser.id
					token.image = createdUser.picture
				} else {
					token.id = existingUser.id
					token.image = existingUser.picture
				}
			}

			return token
		},
		async session({session, token}) {
			session.user.id = token.id as number
			session.user.image = token.image as string
			return session
		},
		async signIn({ account }) {
			return true
		}
	},
	pages: {
		signIn: '/sign-in',
	},
	session: {
		strategy: 'jwt',
	},
	secret: process.env.NEXTAUTH_SECRET,
}