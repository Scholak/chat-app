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
					token = createdUser
				} else {
					token = existingUser
				}
			}

			return token
		},
		async signIn({ account }) {
			console.log(account)
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