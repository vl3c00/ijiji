import { NextResponse } from "next/server";
import { dbPromise } from "@/lib/db"; // Assuming the db file is inside lib

export async function DELETE(req: Request) {
  const { id } = await req.json(); // Get the user ID from the request

  try {
    const db = await dbPromise;
    await db.run("DELETE FROM users WHERE id = ?", [id]);
    return NextResponse.json({ success: true, message: "User deleted successfully" });
  } catch  {
    return NextResponse.json({ success: false, message: "Error deleting user" });
  }
}
