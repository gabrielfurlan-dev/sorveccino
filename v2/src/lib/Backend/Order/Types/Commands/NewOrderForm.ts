import { z } from "zod";

export const NewOrderFormSchema = z.object({
  description: z.string().min(1),
  total: z.coerce.number().default(0),
  totalRecieved: z.coerce.number().default(0),
  totalChange: z.coerce.number().default(0),
  customer: z.object({
    name: z.string().min(1),
    notes: z.string().min(1),
  }),
  troco: z.number().nullable().default(0),
  items: z.array(
    z.object({
      name: z.string().min(1),
      value: z.coerce.number(),
    })
  ),
});

export type NewOrderForm = z.infer<typeof NewOrderFormSchema>;
