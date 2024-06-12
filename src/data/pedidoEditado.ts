export type Pedido = {
    id?: string,
    cliente: string,
    data: Date,
    adicionais: Adicionais[],
    embalagem: Embalagem[]
}

interface Embalagem extends Item {
    adicionais: Item[]
    tamanho: number,
    unidadeMedida: UnidadeMedida
}

interface Item {
    id?: string,
    nome: string,
    categoria?: string,
    preco: number
}

interface Adicionais extends Item {
    quantidade?: number,
    unidadeMedida: UnidadeMedida
}

type UnidadeMedida = 'Kg' | 'g' | 'ml' | 'L' | 'Uni'

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
            },
            {
                nome: 'Creme de Ninho',
                preco: 4,
                quantidade: 10,
                unidadeMedida: 'g',
                categoria: 'Cremes'
            }],
            preco: 10,
            quantidade: 10,
            unidadeMedida: 'Kg',
            categoria: 'Frutas'
        }],
        itens: [{
            nome: 'Cereja',
            preco: 4,
            quantidade: 10,
            unidadeMedida: 'g',
            categoria: 'Frutas'
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