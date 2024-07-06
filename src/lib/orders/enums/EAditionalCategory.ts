import { z } from "zod"

export const AditionalCategorySchema = z.enum(['Cremes', 'Frutas', 'Acompanhamentos'])
export type AditionalCategory = z.infer<typeof AditionalCategorySchema>