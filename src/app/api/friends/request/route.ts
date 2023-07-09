import db from "@/libs/db"
import { pusher } from "@/libs/pusher"
import { getServerSession } from "next-auth"

export async function GET(req: Request) {
	const session = await getServerSession()

	if (!session?.user) {
		return new Response(JSON.stringify({ message: 'user not authenticated' }), {
			status: 401,
		})
	}

	const requests = await db.friendRequest.findMany({
		where: {
			reciever: session.user.email as string
		}
	})

	return new Response(JSON.stringify(requests))
}

export async function POST(req: Request) {
	const session = await getServerSession()

	if (!session?.user) {
		return new Response(JSON.stringify({ message: 'user not authenticated' }), {
			status: 401,
		})
	}

	try {
		const body = await req.json()
		const email: string = body.email

		if (email === session.user.email) {
			return new Response(
				JSON.stringify({ message: 'you cannot add yourself as a friend' }),
				{ status: 400 }
			)
		}

		const authEmail: string = session.user.email as string

		const isAleradySent = await db.friendRequest.findFirst({
			where: {
				sender: authEmail,
        reciever: email
			},
		})

		if (isAleradySent) {
			return new Response(
				JSON.stringify({ message: 'request already sent' }),
				{ status: 400 }
			)
		}

		const sendRequest = await db.friendRequest.create({
			data: {
				sender: authEmail,
				reciever: email,
			},
		})

		if (!sendRequest) {
			return new Response(
				JSON.stringify({ message: 'request could not send' }),
				{ status: 422 }
			)
		}

		await pusher.trigger('user', email, {
			message: 'new friend request',
			sendRequest,
		})

		return new Response(
			JSON.stringify({ message: 'request sended successfully' }),
			{ status: 201 }
		)
	} catch (error: any) {
		return new Response(
			JSON.stringify({ message: 'internal server error', error }),
			{ status: 500 }
		)
	}
}
