import { NextRequest, NextResponse } from "next/server";
import { addUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  const result = await addUser(username, password);
  return NextResponse.json(result);
}
