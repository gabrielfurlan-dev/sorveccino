import { createId } from "@paralleldrive/cuid2";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const clientes = pgTable("clientes", {
    id: text("id").$defaultFn(() => createId()).primaryKey(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    nome: text("nome").notNull(),
    cpf: text("cpf"),
    email: text("email"),
    telefone: text("telefone"),
    cep: text("cep"),
    logradouro: text("logradouro"),
    complemento: text("complemento"),
    bairro: text("bairro"),
    uf: text("uf"),
    numero: text("numero"),
    cidade: text("cidade"),
})