import { text, pgTable, timestamp, jsonb } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2';
import { clientes } from './cliente';

export const pedidos = pgTable("pedidos", {
    id: text("id").$defaultFn(() => createId()).primaryKey(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    nomeCliente: text("nome_cliente").notNull(),
    acais: jsonb("acais").notNull(), //Json do tipo Acai
    cupomDesconto: text("cupom_desconto").notNull(),
    clienteId: text("id_cliente").references(() => clientes.id)
})