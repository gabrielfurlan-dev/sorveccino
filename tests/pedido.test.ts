import { describe, expect, test } from 'bun:test';

type Pagamento = {
    tipo: "dinheiro" | "debito" | "credito" | "pix",
    quantia: number
}

type Pedido = {
    id?: number,
    cliente: string,
    data: Date,
    pagamento: Pagamento[]
}

describe("deve adicionar um pedido a lista de pedidos", () => {

    let pedidos: Pedido[] = []

    pedidos.push(
        {
            cliente: "Maria",
            data: new Date(),
            pagamento: [{ tipo: "dinheiro", quantia: 10 }]
        }
    )

    expect(pedidos.length).toBe(1)
})