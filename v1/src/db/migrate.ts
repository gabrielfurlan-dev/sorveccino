import postgres from 'postgres';

import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { env } from '@/lib/utils/env';

const connection = postgres(env.DATABASE_URL, { max: 1 });
const db = drizzle(connection);

await migrate(db, { migrationsFolder: 'drizzle' });
await connection.end();

console.log("migrate finished.");

process.exit();