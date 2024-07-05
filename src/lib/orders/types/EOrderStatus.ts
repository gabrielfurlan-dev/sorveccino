import { z } from "zod";

export const EOrderStatusSchema = z.enum(["pending", "delivering", "completed", "canceled"]);
export type EOrderStatus = z.infer<typeof EOrderStatusSchema>;
