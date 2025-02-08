import { dbPromise } from "./db";

// Verify user credentials (plain text password)
export async function verifyUser(username: string, password: string) {
  const db = await dbPromise;
  const user = await db.get("SELECT * FROM users WHERE username = ?", [username]);

  if (!user) return null; // User not found

  // Compare stored password with entered password (no hashing)
  return user.password === password ? user : null;
}

// Function to manually add a user (plain text password)
export async function addUser(username: string, password: string) {
  const db = await dbPromise;

  try {
    await db.run("INSERT INTO users (username, password) VALUES (?, ?)", [
      username,
      password, // Store as plain text
    ]);
    return { success: true, message: "User added successfully" };
  } catch {
    return { success: false, message: "Username already exists" };
  }
}
