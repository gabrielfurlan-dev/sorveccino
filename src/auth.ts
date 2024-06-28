import NextAuth from 'next-auth'; 
import Google from 'next-auth/providers/google';
import { DrizzleAdapter } from '@auth/drizzle-adapter';

import { db } from './db/connection';
import { users } from './db/schemas/users';
import { accounts } from './db/schemas/accounts';
import { verificationTokens } from './db/schemas/verificationTokens';
import { sessions } from './db/schemas/session';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts as any,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [Google],
})