import { z } from "zod";
import { EOrderStatusSchema } from "./EOrderStatus";

export const ResumedOrderSchema = z.object({
    id: z.string(),
    clientName: z.string(),
    total: z.number(),
    createdAt: z.date(),
    clientAddress: z.string(),
    status: EOrderStatusSchema,
  });
  
export  type ResumedOrder = z.infer<typeof ResumedOrderSchema>;
  