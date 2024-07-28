import { z } from "zod";

export const NewOrderFormSchema = z.object({
    description: z.string(),
    total: z.coerce.number(),
    totalRecieved: z.coerce.number(),
    customer: z.object({
      name: z.string(),
      notes: z.string(),
    }),
  });
  
  export type NewOrderForm = z.infer<typeof NewOrderFormSchema>;