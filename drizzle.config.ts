import { env } from '@/lib/utils/env';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schemas',
  out: './src/db',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL
  },
});