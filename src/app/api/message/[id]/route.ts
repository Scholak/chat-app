import db from "@/libs/db"
import { getToken } from "next-auth/jwt"
import { NextRequest } from "next/server"

interface Params {
	params: {
		id: number
	}
}

export async function GET(req: NextRequest, { params }: Params) {
	const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

	if (!session) {
		return new Response(JSON.stringify({ message: 'user not authenticated' }), {
			status: 401,
		})
	}

	const messages = await db.message.findMany({
		where: {
			OR: [
				{ from: session.id as number, to: Number(params.id) },
				{ from: Number(params.id), to: session.id as number },
			],
		},
	})

	return new Response(JSON.stringify(messages), { status: 200 })
}
