import { z } from "zod";
import { AditionalSchema } from "./Aditional";
import { PackagingSchema } from "./Packaging";
import { SaleSchema } from "./Sale";

export const AcaiSchema = z.object({
  packaging: PackagingSchema,
  aditionals: z.array(AditionalSchema).nullable(),
  sale: SaleSchema.nullable(),
  notes: z.string().nullable(),
})

export type Acai = z.infer<typeof AcaiSchema>