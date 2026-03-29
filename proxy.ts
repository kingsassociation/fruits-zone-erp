import { authConfig } from "./auth.config"
import NextAuth from "next-auth"

const { auth } = NextAuth(authConfig)

// NextAuth v5 'auth' function is the entry point for the new Proxy convention.
// Exporting it as default ensures Next.js identifies it as the proxy handler.
export default auth

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
