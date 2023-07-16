import db from '@/libs/db'
import { pusherServer } from '@/libs/pusherServer'
import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'

export async function PUT(req: NextRequest) {
	const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRETs })

	if (!session) {
		return new Response(JSON.stringify({ message: 'user not authenticated' }), {
			status: 401,
		})
	}

	try {
		const { senderEmail } = await req.json()

		const sender = await db.user.findFirst({
			where: {
				email: senderEmail,
			},
		})

		if (!sender) {
			return new Response(JSON.stringify({ message: 'user not exist' }), {
				status: 401,
			})
		}

		const authEmail: string = session.email as string

		await db.friendRequest.deleteMany({
			where: {
				sender: senderEmail,
				reciever: authEmail,
			},
		})

		await pusherServer.trigger('user', sender.email, {
			message: 'friend request declined',
		})

		return new Response(
			JSON.stringify({ message: 'request declined successfully' }),
			{ status: 201 }
		)
	} catch (error: any) {
		return new Response(
			JSON.stringify({
				message: 'internal server error',
				error: error.message,
			}),
			{ status: 500 }
		)
	}
}
