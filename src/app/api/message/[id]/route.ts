import db from "@/libs/db"
import { pusherServer } from "@/libs/pusherServer"
import { getToken } from "next-auth/jwt"
import { NextRequest } from "next/server"
import { storage } from '@/libs/storage'

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

export async function DELETE(req: NextRequest, { params }: Params) {
	const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

	if (!session) {
		return new Response(JSON.stringify({ message: 'user not authenticated' }), {
			status: 401,
		})
	}

	try {
		const authId: number = session.id as number
		let room: string

		const deletedMessage = await db.message.delete({
			where: {
				id: Number(params.id)
			}
		})

		if (deletedMessage.type === 'FILE') {
			const parsedUrl = deletedMessage.content.split('/')
			const filename = parsedUrl[parsedUrl.length - 1]
			const publicId = filename.split('.')[0]
			
			await storage.uploader.destroy(publicId, function(result: any) {});
		}

		if (deletedMessage) {
			if (authId < deletedMessage.to) {
				room = `${authId}_${deletedMessage.to}`
			} else {
				room = `${deletedMessage.to}_${authId}`
			}

			await pusherServer.trigger('chat', room, {})

			return new Response(null, { status: 204 })
		} else {
			return new Response(JSON.stringify({ message: 'message could not deleted' }), { status: 400 })
		}
	} catch (error: any) {
		return new Response(JSON.stringify({ message: 'internal server error', error: error.message }), { status: 500 })
	}
}