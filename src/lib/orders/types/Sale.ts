import { EDaysOfWeek, EDaysOfWeekSchema } from "@/lib/date/EDaysOfWeek"
import { z } from "zod"

export const SaleSchema = z.object({
    price: z.number(),
    description: z.string(),
    daysOfWeek: z.array(EDaysOfWeekSchema),
})

export type Sale = z.infer<typeof SaleSchema>