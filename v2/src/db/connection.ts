import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schemas';
import { env } from '@/lib/utils/env';

const connection = postgres(env.DATABASE_URL, {
  ssl: { rejectUnauthorized: false }
});

export const db = drizzle(connection, { schema });
