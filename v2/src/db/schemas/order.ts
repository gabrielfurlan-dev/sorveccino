import { text, pgTable, timestamp, numeric, jsonb } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const orders = pgTable("orders", {
  id: text("id").$defaultFn(() => createId()).primaryKey(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(), 
  description: text("description"),
  total: numeric("total"),
  totalRecieved: numeric("totalRecieved"),
  customer: jsonb("customer"),
  items: jsonb("items"),
});
