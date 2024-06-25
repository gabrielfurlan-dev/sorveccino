import { Acai } from "./Acai"

export type Pedido = {
    id?: string,
    nomeCliente: string,
    data: Date,
    acais: Acai[],
    cupomDesconto?: string
}
