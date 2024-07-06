import { EOrderStatus } from "../enums/EOrderStatus"
import { Acai } from "./Acai"

export type Order = {
    id: string,
    customerId: string,
    createdAt: Date,
    acais: Acai[],
    discountCode?: string,
    status: EOrderStatus,
    total: number
}
