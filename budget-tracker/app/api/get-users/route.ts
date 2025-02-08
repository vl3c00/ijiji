import { NextResponse } from "next/server";
import { dbPromise } from "@/lib/db"; // Assuming the db file is inside lib

export async function GET() {
  try {
    const db = await dbPromise;
    const users = await db.all("SELECT * FROM users");
    return NextResponse.json({ success: true, users });
  } catch  {
    return NextResponse.json({ success: false, message: "Error fetching users" });
  }
}
