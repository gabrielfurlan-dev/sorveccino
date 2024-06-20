import { createId } from "@paralleldrive/cuid2";
import { numeric, text, timestamp } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { itens } from "./itens";
import { relations } from "drizzle-orm";

export const embalagens = pgTable("embalagens", {
    id: text("id").$defaultFn(() => createId()).primaryKey(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    tamanho: numeric("tamanho").notNull(),
    unidadeMedida: text("unidade_medida").notNull(),
    idItem: text("id_item").references(() => itens.id),
})

export const embalagensRelation = relations(embalagens, ({ one, many }) => {
    return {
        item: one(itens, {
            fields: [embalagens.idItem],
            references: [itens.id],
        }),
        embalagens: many(embalagens),
    }
})
