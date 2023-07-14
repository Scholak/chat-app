import { NextApiRequest, NextApiResponse } from "next";
import formidable from 'formidable'
import { parseForm } from '@/libs/helpers'
import { storage } from '@/libs/storage'
import db from "@/libs/db";
import { getToken } from "next-auth/jwt";
import { pusherServer } from "@/libs/pusherServer";

export const config = {
  api: {
    bodyParser: false
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if(!session) {
    return res.status(401).json({ message: 'user not authenticated' })
  }
  
  const authId: number = session.id as number

  const form = formidable()
  const { files } = await parseForm(form, req)
  const file = files.file as any

  let room: string

	if (authId < Number(req.query.id)) {
		room = `${authId}_${Number(req.query.id)}`
	} else {
		room = `${Number(req.query.id)}_${authId}`
	}

  storage.uploader.upload(file[0].filepath, {
		public_id: `${Date.now()}`,
		resource_type: 'image',
	}, async (error, result) => {
    if (result) {
      const message = await db.message.create({
				data: {
					type: 'FILE',
					content: result.secure_url,
					from: authId,
					to: Number(req.query.id),
				},
			})

      await pusherServer.trigger('chat', room, {
				message,
			})
    }
  })
}

export default handler