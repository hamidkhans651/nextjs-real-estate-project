import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { users } from "@/server/schema";
import { auth } from "@/server/auth";

export async function POST(request: Request) {
  try {
    // Check if the current user is an admin
    const session = await auth();
    if (!session || !session.user || !('role' in session.user) || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Prevent demoting yourself
    if (session.user.id === userId) {
      return NextResponse.json({ error: "Cannot demote yourself" }, { status: 400 });
    }

    // Update the user's role to regular user
    await db.update(users)
      .set({ role: "user" })
      .where(eq(users.id, userId));

    return NextResponse.json({ success: true, message: "Admin demoted to regular user" });
  } catch (error) {
    console.error("Error demoting admin:", error);
    return NextResponse.json({ error: "Failed to demote admin" }, { status: 500 });
  }
} 