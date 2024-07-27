import { text, pgTable, timestamp, numeric, jsonb } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const orders = pgTable("orders", {
  id: text("id").$defaultFn(() => createId()).primaryKey(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(), 
  description: text("descprition"),
  total: numeric("total"),
  totalToRecieve: numeric("total"),
  customer: jsonb("customer"),
});
