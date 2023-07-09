import db from "@/libs/db"
import { pusher } from "@/libs/pusher"
import { getServerSession } from "next-auth"

export async function POST(req: Request) {
	const session = await getServerSession()

	if (!session?.user) {
		return new Response(JSON.stringify({ message: 'user not authenticated' }), {
			status: 401,
		})
	}

	try {
		const { senderEmail } = await req.json()

		const authEmail: string = session.user.email as string

		await db.friendRequest.deleteMany({
			where: {
				sender: senderEmail,
				reciever: authEmail,
			},
		})

		const addFriend = await db.friend.create({
			data: {
				userOne: authEmail,
				userTwo: senderEmail,
			},
		})

    const addFriendReverse = await db.friend.create({
			data: {
				userOne: senderEmail,
				userTwo: authEmail,
			},
		})

		if (!addFriend || !addFriendReverse) {
			return new Response(
				JSON.stringify({ message: 'user could not added' }),
				{ status: 422 }
			)
		}

		await pusher.trigger('user', senderEmail, {
			message: 'friend request accepted',
			email: authEmail,
		})

		return new Response(
			JSON.stringify({ message: 'request accepted successfully' }),
			{ status: 201 }
		)
	} catch (error: any) {
		return new Response(
			JSON.stringify({ message: 'internal server error', error }),
			{ status: 500 }
		)
	}
}
