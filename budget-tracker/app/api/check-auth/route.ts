import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const decoded = verify(token, SECRET_KEY);
    return NextResponse.json({ authenticated: true, user: decoded });
  } catch {
    // No need for 'error' here if not used
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
