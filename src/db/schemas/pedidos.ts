import { text, pgTable, timestamp } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2';

export const pedidos = pgTable("pedidos", {
    id: text("id").$defaultFn(() => createId()).primaryKey(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

//nomeCliente: string,
//data: Date,
//acais: Acai[],
//cupomDesconto?: string