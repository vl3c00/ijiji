import { NextRequest, NextResponse } from "next/server";
import { verifyUser } from "@/lib/auth";
import { sign } from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    const user = await verifyUser(username, password);

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // Generate authentication token
    const token = sign({ username, authenticated: true }, SECRET_KEY, { expiresIn: "1h" });

    // Set token in cookies
    const response = NextResponse.json({ message: "Authenticated" }, { status: 200 });
    response.cookies.set("auth_token", token, { httpOnly: true, path: "/" });

    return response;
  } catch {
    // Remove 'error' if you don't need it
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
