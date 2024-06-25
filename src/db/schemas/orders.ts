import { text, pgTable, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { customers } from "./cliente";

export const orders = pgTable("orders", {
  id: text("id").$defaultFn(() => createId()).primaryKey(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  acais: jsonb("acais").notNull(), //Json of Acai type
  saleCode: text("sale_code").notNull(),
  customerId: text("customer_id").references(() => customers.id),
});
