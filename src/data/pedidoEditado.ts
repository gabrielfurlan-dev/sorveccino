export type Pedido = {
    id?: string,
    cliente: string,
    data: Date,
    itens: Item[],
    embalagem: Embalagem[]
}

interface Embalagem extends Item {
    adicionais: Item[]
}

interface Item {
    id?: string,
    nome: string,
    categoria?: string,
    quantidade?: number,
    unidadeMedida: 'Kg' | 'g' | 'ml' | 'L' | 'Uni',
    preco: number
}

export async function obterPedidoEditado(): Promise<Pedido> {
    return {
        cliente: 'Evylin',
        data: new Date(),
        embalagem: [{
            nome: 'Paraíso',
            adicionais: [{
                nome: 'Morango',
                preco: 4,
                quantidade: 10,
                unidadeMedida: 'g',
                categoria: 'Frutas'
            }]
        }]
    }
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