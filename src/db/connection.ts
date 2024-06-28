import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { env } from '@/lib/utils/env';
import * as schema from './schemas';

const connection = postgres(env.DATABASE_URL, {
  ssl: { rejectUnauthorized: false } // Ensure SSL connections are properly handled
});

export const db = drizzle(connection, { schema });
