import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isDashboard = nextUrl.pathname.startsWith("/dashboard")
      const isAdminDashboard = nextUrl.pathname.startsWith("/dashboard/admin")
      const isVendorDashboard = nextUrl.pathname.startsWith("/dashboard/vendor")

      if (isDashboard) {
        if (isLoggedIn) {
          const role = (auth.user as any).role

          if (isAdminDashboard && role !== "ADMIN") {
            return Response.redirect(new URL("/dashboard/vendor", nextUrl))
          }
          if (isVendorDashboard && role !== "VENDOR") {
            return Response.redirect(new URL("/dashboard/admin", nextUrl))
          }
          return true
        }
        return false // Redirect unauthenticated users to login page
      } else if (isLoggedIn && (nextUrl.pathname === "/login" || nextUrl.pathname === "/register")) {
        const role = (auth.user as any).role
        return Response.redirect(
          new URL(role === "ADMIN" ? "/dashboard/admin" : "/dashboard/vendor", nextUrl)
        )
      }
      return true
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = (user as any).role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token.role && session.user) {
        (session.user as any).role = token.role
        session.user.id = token.id as string
      }
      return session
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          const user = await prisma.user.findUnique({ where: { email } })
          if (!user || !user.password) return null

          const passwordsMatch = await bcrypt.compare(password, user.password)

          if (passwordsMatch) return user
        }

        return null
      },
    }),
  ],
} satisfies NextAuthConfig
