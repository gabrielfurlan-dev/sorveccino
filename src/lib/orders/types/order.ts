import { Acai } from "./Acai"

export type Order = {
    id?: string,
    customerName: string,
    createdAt: Date,
    acais: Acai[],
    discountCode?: string
}
