import { createId } from "@paralleldrive/cuid2";
import { pgTable, jsonb, numeric, text, timestamp } from "drizzle-orm/pg-core";
import { embalagens } from "./embalagens";
import { promocoes } from "./promocao";
import { adicionais } from "./adicionais";
import { relations } from "drizzle-orm";

export const acais = pgTable("acais", {
    id: text("id").$defaultFn(() => createId()).primaryKey(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    nome: text("nome").notNull(),
    categoria: text("categoria").notNull(),
    tamanho: numeric("tamanho").notNull(),
    unidadeMedida: text("unidade_medida").notNull(),
    preco: numeric("preco").notNull(),
    embalagenId: text("id_embalagem").references(() => embalagens.id),
    adicionais: jsonb("adicionais"),
    promocaoId: text("id_promocao").references(() => promocoes.id),
    observacoes: text("observacoes")
})

export const acaiRelation = relations(acais, ({ one, many }) => {
    return {
        embalagem: one(embalagens, {
            fields: [acais.embalagenId],
            references: [embalagens.id],
        }),
        promocao: one(promocoes, {
            fields: [acais.promocaoId],
            references: [promocoes.id],
        }),
        adicionais: many(adicionais),
    }
})
