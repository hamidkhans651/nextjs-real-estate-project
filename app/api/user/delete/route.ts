// app/api/user/delete/route.ts
import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { users } from "@/server/schema";

export async function POST(request: Request) {
  const { userId } = await request.json();

  await db.delete(users).where(eq(users.id, userId));
  // Also delete from accounts table if using OAuth

  return NextResponse.json({ success: true });
}
