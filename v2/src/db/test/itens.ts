import { createId } from "@paralleldrive/cuid2";
import { text, timestamp, pgTable, numeric  } from "drizzle-orm/pg-core";

export const itens = pgTable("itens", {
    id: text("id").$defaultFn(() => createId()).primaryKey(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    nome: text("nome").notNull(),
    categoria: text("categoria").notNull(),
    preco: numeric("preco").notNull(),
})