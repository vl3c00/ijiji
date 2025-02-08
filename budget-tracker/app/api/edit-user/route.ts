import { NextResponse } from "next/server";
import { dbPromise } from "@/lib/db"; // Assuming the db file is inside lib

export async function PUT(req: Request) {
  const { id, username, password } = await req.json(); // Get the user details

  try {
    const db = await dbPromise;
    await db.run(
      "UPDATE users SET username = ?, password = ? WHERE id = ?",
      [username, password, id]
    );
    return NextResponse.json({ success: true, message: "User updated successfully" });
  } catch {
    return NextResponse.json({ success: false, message: "Error updating user" });
  }
}
