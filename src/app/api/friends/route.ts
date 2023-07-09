import db from "@/libs/db";
import { getServerSession } from "next-auth";

export async function GET(req: Request) {
  const session = await getServerSession()

  if(!session?.user) {
    return new Response(JSON.stringify({ message: 'user not authenticated' }), { status: 401 })
  }

  const friends = await db.friend.findMany({
    where: {
      userOne: session.user.email as string
    }
  })

  return new Response(JSON.stringify(friends), { status: 200 })
}

export async function POST(req: Request) {
	const session = await getServerSession()

  if(!session?.user) {
    return new Response(JSON.stringify({ message: 'user not authenticated' }), { status: 401 })
  }

  try {
    const body = await req.json()
    const email: string = body.email

    if(email === session.user.email) {
      return new Response(JSON.stringify({ message: 'you cannot add yourself as a friend' }), { status: 400 })
    }

    const authEmail: string = session.user.email as string

    const isAleradyFriend = await db.friend.findFirst({
			where: {
				OR: [
					{
						userOne: email,
						userTwo: authEmail,
					},
					{
						userOne: authEmail,
						userTwo: email,
					},
				],
			},
		})

    if (isAleradyFriend) {
			return new Response(
				JSON.stringify({ message: `${email} is already your friend` }),
				{ status: 400 }
			)
		}

    const addFriend = await db.friend.create({
			data: {
				userOne: authEmail,
				userTwo: email,
			},
		})

    const addFriendReverse = await db.friend.create({
			data: {
				userTwo: authEmail,
				userOne: email,
			},
		})

    if (!addFriend || !addFriendReverse) {
			return new Response(
				JSON.stringify({ message: 'friend could not added' }),
				{ status: 422 }
			)
		}

    return new Response(JSON.stringify({ message: 'friend added successfully' }), { status: 201 })
  } catch (error: any) {
    return new Response(JSON.stringify({ message: 'internal server error', error }), { status: 500 })
  }
}