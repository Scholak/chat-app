import db from "@/libs/db";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getToken({req, secret: process.env.NEXTAUTH_SECRET})

  if(!session) {
    return new Response(JSON.stringify({ message: 'user not authenticated' }), { status: 401 })
  }

  const friendIds = await db.friend.findMany({
    where: {
      OR: [
				{userOne: session.id as number},
				{userTwo: session.id as number},
			]
    }
  })

  const ids = friendIds.map(friend => {
    if(friend.userOne === session.id) {
      return friend.userTwo
    } else {
      return friend.userOne
    }
  })

  const friends = await db.user.findMany({
    where: {
      id: {
        in: ids
      }
    }
  })

  return new Response(JSON.stringify(friends), { status: 200 })
}