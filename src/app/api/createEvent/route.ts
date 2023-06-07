import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { OPTIONS } from "../../api/auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(OPTIONS);

  if (!session) {
    return NextResponse.json({ message: "You are not logged in." });
  }

  console.log(session);

  return NextResponse.json({ name: session?.user?.name });
}
