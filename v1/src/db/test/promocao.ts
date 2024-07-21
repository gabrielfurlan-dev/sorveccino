import { createId } from "@paralleldrive/cuid2";
import { boolean, jsonb, numeric, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const promocoes = pgTable("promocoes", {
    id: text("id").$defaultFn(() => createId()).primaryKey(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    nome: text("nome").notNull(),
    categoria: text("categoria").notNull(),
    descontoPorcentagem: numeric("preco").notNull(),
    diasDaSemana: jsonb("dias_da_semana").notNull(), 
    ativo: boolean("ativo").notNull()
})