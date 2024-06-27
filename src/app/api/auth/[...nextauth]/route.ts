import { db } from "@/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth/next";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import { env } from '@/lib/utils/env';

const options: NextAuthOptions = {
  adapter: DrizzleAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID as string,
      clientSecret: env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };