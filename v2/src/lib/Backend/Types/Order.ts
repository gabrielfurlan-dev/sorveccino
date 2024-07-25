import { z } from "zod";

export const OrderSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  description: z.string(),
  total: z.number(),
  totalToRecieve: z.number(),
  customer: z.object({
    name: z.string(),
    notes: z.string(),
  }),
});

export type Order = z.infer<typeof OrderSchema>;
