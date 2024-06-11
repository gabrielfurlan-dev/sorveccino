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
    id?: number
    cliente: string
    data: Date
    total: number
}

export async function adicionarPedido({ cliente, data, total }: pedidoRequestProps) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return
}