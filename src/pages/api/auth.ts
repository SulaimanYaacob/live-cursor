import { authorize } from "@liveblocks/node";
import { type NextRequest, type NextResponse } from "next/server";

const secret = process.env.LIVEBLOCKS_SECRET_KEY as string;

export default async function auth(req: NextRequest, res: NextResponse) {
  const room: string | undefined = req?.body?.room as string;
  const result = await authorize({
    room,
    secret,
    userId: "123",
  });
  return res.status(result.status).end(result.body) as NextResponse;
}
