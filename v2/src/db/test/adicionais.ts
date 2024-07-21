import { createId } from "@paralleldrive/cuid2";
import { numeric, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const adicionais = pgTable("adicionais", {
    id: text("id").$defaultFn(() => createId()).primaryKey(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    nome: text("nome").notNull(),
    categoria: text("categoria").notNull(),
    preco: numeric("preco").notNull()
})