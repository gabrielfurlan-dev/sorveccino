export const acais = pgTable("acais", {
    id: text("id").$defaultFn(() => createId()).primaryKey(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    nome: text("nome").notNull(),
    categoria: text("categoria").notNull(),
    tamanho: int("tamanho").notNull(),
    unidadeMedida: text("unidade_medida").notNull(),
    preco: float("preco").notNull(),
})


// embalagem: Embalagem,
// adicionais?: Adicional[]
// promocao?: Promocao,
// onservacoes?: string,