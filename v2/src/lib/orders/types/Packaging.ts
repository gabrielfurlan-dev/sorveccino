import { z } from "zod"

export const PackagingSchema = z.object({
    description: z.string(),
    category: z.string(),
    price: z.number(),
})

export type Packaging = z.infer<typeof PackagingSchema>