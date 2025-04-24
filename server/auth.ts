import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "./db"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "@/types/login-schema"
import { users, RoleEnum } from "./schema"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db) as any,
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          const {email, password} = validatedFields.data

          const user = await db.query.users.findFirst({
            where: eq(users.email, email),
          })
          if (!user || !user.password) return null

          const passwordMatch = await bcrypt.compare(password, user.password)
          if (passwordMatch) return user
        }
        return null
      }
    })
  ],
  pages: {
    signIn: "/login"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role as typeof RoleEnum.enumValues[number]
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role as typeof RoleEnum.enumValues[number]
        session.user.id = token.id as string
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  }
})