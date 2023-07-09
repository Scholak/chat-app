import db from "@/libs/db"
import { pusherServer } from "@/libs/pusherServer"
import { getServerSession } from "next-auth"
import { getToken } from "next-auth/jwt"
import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
	const session = await getToken({req, secret: process.env.NEXTAUTH_SECRETs})

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

		const authId: number = session.id as number
		const authEmail: string = session.email as string

		await db.friendRequest.deleteMany({
			where: {
				sender: senderEmail,
				reciever: authEmail,
			},
		})

		let addFriend

		if (authId < sender.id) {
			addFriend = await db.friend.create({
				data: {
					userOne: authId,
					userTwo: sender.id,
				},
			})
		} else {
			addFriend = await db.friend.create({
				data: {
					userOne: sender.id,
					userTwo: authId,
				},
			})
		}

		if (!addFriend) {
			return new Response(
				JSON.stringify({ message: 'user could not added' }),
				{ status: 422 }
			)
		}

		await pusherServer.trigger('user', sender.email, {
			message: 'friend request accepted',
		})

		return new Response(
			JSON.stringify({ message: 'request accepted successfully' }),
			{ status: 201 }
		)
	} catch (error: any) {
		return new Response(
			JSON.stringify({ message: 'internal server error', error: error.message }),
			{ status: 500 }
		)
	}
}
