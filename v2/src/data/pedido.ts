import { Pedido } from "@/lib/orders/types/Pedido"

export async function obterPedidos() {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return [
        {
            id: 1,
            cliente: 'Gabriel Furlan',
            data: new Date(),
            total: 100
        },
        {
            id: 2,
            cliente: 'Evylin',
            data: new Date(),
            total: 200
        }]
}

interface pedidoRequestProps {
    nomeCliente: string
    pedido: Pedido
}

export async function adicionarPedido({ nomeCliente, pedido }: pedidoRequestProps) {
    return
}