import db from "@/libs/db";

interface Params {
  params: {
    id: number
  }
}

export async function GET(req: Request, { params }: Params) {
  const friend = await db.user.findUnique({
		where: {
			id: Number(params.id),
		},
	})

  return new Response(JSON.stringify(friend))
}