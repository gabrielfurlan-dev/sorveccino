import { z } from "zod";
import { AditionalCategorySchema } from "@/lib/orders/enums/EAditionalCategory";

export const AditionalSchema = z.object({
  name: z.string(),
  category: AditionalCategorySchema.nullable(),
  price: z.number(),
});

export type Aditional = z.infer<typeof AditionalSchema>;
