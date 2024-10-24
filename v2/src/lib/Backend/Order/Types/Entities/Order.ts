import { z } from "zod";

export const OrderSchema = z.object({
  id: z.string().nullable(),
  createdAt: z.date(),
  description: z.string(),
  total: z.number(),
  totalRecieved: z.number(),
  customer: z.object({
    name: z.string(),
    notes: z.string(),
  }),
  items: z.array(z.object({ name: z.string(), value: z.number() })),
});

export type Order = z.infer<typeof OrderSchema>;
