import { PrismaAdapter } from "@auth/prisma-adapter"
import type { AuthOptions } from "next-auth"
import { db } from "./prisma"
import type { Adapter } from "next-auth/adapters"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user = {
        ...session.user,
        id: user.id,
      } as {
        id: string
        name?: string | null
        email?: string | null
        image?: string | null
      }

      return session
    },
  },
}
