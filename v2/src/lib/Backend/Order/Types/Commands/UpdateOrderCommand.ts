import { z } from "zod";

export const UpdateOrderCommandSchema = z.object({
  id: z.string().min(1),
  description: z.string(),
  customer: z.object({
    name: z.string(),
    notes: z.string(),
  }),
  total: z.coerce.number(),
  totalToRecieve: z.coerce.number(),
  items: z.array(
    z.object({
      name: z.string(),
      value: z.coerce.number(),
    })
  ),
  totalChange: z.coerce.number(),
});

export type UpdateOrderCommand = z.infer<typeof UpdateOrderCommandSchema>;