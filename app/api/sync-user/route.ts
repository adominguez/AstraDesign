// pages/api/auth/sync-user.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getAuth, currentUser } from "@clerk/nextjs/server";
import { turso } from "@/lib/turso";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);
  if (!userId) {
    return new Response(JSON.stringify({ error: 'User not authenticated' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Obtener email usando Clerk SDK
  const clerkUser = await currentUser()
  if (!clerkUser) {
    return new Response(JSON.stringify({ error: 'User not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  const email = clerkUser.emailAddresses[0].emailAddress;
  const name = clerkUser.firstName;
  const lastName = clerkUser.lastName;

  // Upsert en Turso usando SQLite ON CONFLICT
  const sql = `
    INSERT INTO users (id, email, name, last_name)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE
      SET email = excluded.email,
          updated_at = CURRENT_TIMESTAMP
  `;
  await turso.execute({ sql, args: [userId, email, name, lastName] });

  return new Response(JSON.stringify({ message: 'User synced successfully' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}
