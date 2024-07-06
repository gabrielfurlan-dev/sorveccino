import { z } from "zod"
import { EOrderStatusSchema } from "../enums/EOrderStatus"
import { AcaiSchema } from "./Acai"

export const OrderSchema = z.object({
    id: z.string().nullable(),
    customerId: z.string(),
    createdAt: z.date().nullable(),
    acais: z.array(AcaiSchema),
    discountCode: z.string(),
    status: EOrderStatusSchema,
    total: z.number(),
})

export type Order = z.infer<typeof OrderSchema>