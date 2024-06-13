import { createId } from "@paralleldrive/cuid2"

export type Pedido = {
    id?: string,
    nomeCliente: string,
    data: Date,
    acais: Acai[],
    cupomDesconto?: string
}

interface Acai extends Item {
    embalagem: Embalagem,
    adicionais?: Adicional[]
    promocao?: Promocao,
    onservacoes?: string,
}

type Promocao = {
    descontoPorcentagem: number,
    nomePromocao: string,
    diasDaSemana: []
}

interface Embalagem extends Item {
    nome: string,
    categoria: string,
    tamanho: number,
    unidadeMedida: UnidadeMedida
}

interface Item {
    id?: string,
    nome: string,
    categoria?: string,
    preco: number
}

interface Adicional extends Item { }

type UnidadeMedida = 'Kg' | 'g' | 'ml' | 'L' | 'Uni'

export async function obterPedidoEditado(): Promise<Pedido> {
    return {
        id: createId(),
        nomeCliente: 'Evylin',
        data: new Date(),
        acais: [
            {
                id: createId(),
                embalagem: {
                    id: createId(),
                    categoria: 'Copos descartáveis - Açaí',
                    nome: 'Copo',
                    tamanho: 300,
                    unidadeMedida: "ml",
                    preco: 10,
                },
                adicionais: [
                    {
                        id: createId(),
                        nome: 'Morango',
                        preco: 4,
                        categoria: 'Frutas'
                    },
                    {
                        id: createId(),
                        nome: 'Creme de Ninho',
                        preco: 4,
                        categoria: 'Cremes'
                    },
                ],
                preco: 18,
                nome: 'acai'
            }
        ]
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