"use server";

import { LoginSchema } from "@/types/login-schema";
import { actionClient } from "@/lib/safe-action";
import bcrypt from "bcryptjs";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { signIn } from "../auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const LoginAccount = actionClient
  .schema(LoginSchema)
  .action(
    async ({ parsedInput: { email, password } }) => {
      const user = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (!user || !user.password) {
        return { error: "Invalid email or password" };
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return { error: "Invalid email or password" };
      }

      // Check if the user is trying to access admin routes
      const headersList = await headers();
      const referer = headersList.get("referer") || "";
      const isAdminRoute = referer.includes("/admin");
      
      // If trying to access admin routes, verify the user is an admin
      if (isAdminRoute && user.role !== "admin") {
        return { error: "You do not have permission to access the admin area" };
      }

      await signIn("credentials", {
        email,
        password,
        redirect: false
      }) 
    
      return { success: "Login successful" };
    }
  );