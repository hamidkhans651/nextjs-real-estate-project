"use server";

import { z } from "zod";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/server/db";
import { users } from "@/server/schema";
import { eq } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { sendEmail } from "@/lib/email";
import { addHours } from "date-fns";

const requestResetSchema = z.object({
  email: z.string().email(),
});

const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const RequestPasswordReset = createSafeAction(requestResetSchema, async (data) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, data.email),
    });

    if (!user) {
      return { error: "No account found with this email address" };
    }

    // Generate a secure reset token
    const resetToken = createId();
    const expiresAt = addHours(new Date(), 1); // Token expires in 1 hour

    // Store the reset token in the database
    await db
      .update(users)
      .set({
        resetToken,
        resetTokenExpires: expiresAt,
      })
      .where(eq(users.id, user.id));

    // Send reset email
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;
    await sendEmail({
      to: user.email,
      subject: "Reset Your Password",
      html: `
        <p>Hello,</p>
        <p>You requested to reset your password. Click the link below to reset it:</p>
        <p><a href="${resetUrl}">Reset Password</a></p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    });

    return { success: "Password reset link sent to your email" };
  } catch (error) {
    console.error("Password reset request error:", error);
    return { error: "Failed to process password reset request" };
  }
});

export const ResetPassword = createSafeAction(resetPasswordSchema, async (data) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.resetToken, data.token),
    });

    if (!user) {
      return { error: "Invalid or expired reset token" };
    }

    if (!user.resetTokenExpires || user.resetTokenExpires < new Date()) {
      return { error: "Reset token has expired" };
    }

    // Update password and clear reset token
    await db
      .update(users)
      .set({
        password: data.password, // Note: Password hashing should be handled by a trigger or middleware
        resetToken: null,
        resetTokenExpires: null,
      })
      .where(eq(users.id, user.id));

    return { success: "Password has been reset successfully" };
  } catch (error) {
    console.error("Password reset error:", error);
    return { error: "Failed to reset password" };
  }
}); 