import { z } from "zod";

const envSchema = z.object({
    DATABASE_URL: z.string(),
    SERVER_PORT: z.coerce.number()
})

export const env = envSchema.parse({
    DATABASE_URL: process.env.DATABASE_URL,
    SERVER_PORT: process.env.SERVER_PORT,
})