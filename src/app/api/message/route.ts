import db from "@/libs/db";
import { pusherServer } from "@/libs/pusherServer";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if(!session) {
    return new Response(JSON.stringify({ message: 'user not authenticated' }), { status: 401 })
  }

  const body = await req.json()

  const authId: number = session.id as number

  try {
    const message = await db.message.create({
			data: {
				type: 'TEXT',
				content: body.content,
				from: authId,
				to: body.to,
			},
		})

    let room: string
    
    if (authId < body.to) {
      room = `${authId}_${body.to}`
		} else {
      room = `${body.to}_${authId}`
    }

    await pusherServer.trigger('chat', room, {
			message,
		})

    return new Response(null, { status: 200 })
  } catch (error: any) {
    return new Response(JSON.stringify({ message: 'internal server error', error }), { status:  500 })
  }
}