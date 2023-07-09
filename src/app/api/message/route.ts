import db from "@/libs/db";
import { pusher } from "@/libs/pusher";
import { getServerSession } from "next-auth";

export async function GET(req: Request) {
  const session = await getServerSession()

  if(!session?.user) {
    return new Response(JSON.stringify({ message: 'user not authenticated' }), { status: 401 })
  }

  const messages = await db.message.findMany({
		where: {
			OR: [
        { from: session.user.email as string },
        { to: session.user.email as string },
      ],
		},
	})

  return new Response(JSON.stringify(messages), { status: 200 })
}

export async function POST(req: Request) {
  const session = await getServerSession()

  if(!session?.user) {
    return new Response(JSON.stringify({ message: 'user not authenticated' }), { status: 401 })
  }

  const body = await req.json()


  try {
    const message = await db.message.create({
      data: {
        type: 'TEXT',
        content: body.content,
        from: session.user.email as string,
        to: body.to
      }
    })

    await pusher.trigger('chat', 'message', {
			message,
		})

    return new Response(null, { status: 200 })
  } catch (error: any) {
    return new Response(JSON.stringify({ message: 'internal server error', error }), { status:  500 })
  }
}