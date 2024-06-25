import { createId } from "@paralleldrive/cuid2";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const customers = pgTable("customers", {
    id: text("id").$defaultFn(() => createId()).primaryKey(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    name: text("name").notNull(),
    cpf: text("cpf"),
    email: text("email"),
    phone: text("phone"),
    zipCode: text("zipCode"),
    address: text("address"),
    city: text("city"),
    state: text("state"),
    number: text("number"),
    complement: text("complement"),
    neighborhood: text("neighborhood"),
})