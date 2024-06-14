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

export interface Embalagem extends Item {
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

export interface Adicional extends Item { }

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

export const ListaEmbalagens: Embalagem[] = [
    {
        id: '1',
        nome: "Copo 330ml",
        categoria: "Copos descartáveis - Açaí",
        tamanho: 330,
        unidadeMedida: "ml",
        preco: 10
    },
    {
        id: '2',
        nome: "Copo 440ml",
        categoria: "Copos descartáveis - Açaí",
        tamanho: 440,
        unidadeMedida: "ml",
        preco: 12
    },
    {
        id: '3',
        nome: "Copo 550ml",
        categoria: "Copos descartáveis - Açaí",
        tamanho: 550,
        unidadeMedida: "ml",
        preco: 14
    },
    {
        id: '4',
        nome: "Copo 770ml",
        categoria: "Copos descartáveis - Açaí",
        tamanho: 770,
        unidadeMedida: "ml",
        preco: 16
    }
]

export const ListaAdicionais: Adicional[] = [
    { id: '1', nome: "Paçoca", preco: 2 },
    { id: '2', nome: "Granola", preco: 2 },
    { id: '3', nome: "Amendoim Granulado", preco: 2 },
    { id: '4', nome: "Ouro Branco", preco: 2 },
    { id: '5', nome: "Sonho de Valsa", preco: 2 },
    { id: '6', nome: "KitKat", preco: 4 },
    { id: '7', nome: "Ovo Maltine", preco: 2.5 },
    { id: '8', nome: "Leite em Pó", preco: 2 },
    { id: '9', nome: "Confete", preco: 2.5 },
    { id: '10', nome: "Creme de Ninho", preco: 4 },
    { id: '11', nome: "Creme de Avelã", preco: 4 },
    { id: '12', nome: "Creme de Cookies Branco", preco: 4 },
    { id: '13', nome: "Creme de Bombom", preco: 4 },
    { id: '14', nome: "Nutella", preco: 7 },
    { id: '15', nome: "Pistache", preco: 7 },
    { id: '16', nome: "Creme de Coco", preco: 4 },
    { id: '17', nome: "Leite Condensado", preco: 1.5 },
    { id: '18', nome: "Calda de Chocolate", preco: 1.5 },
    { id: '19', nome: "Calda de Morango", preco: 1.5 },
    { id: '20', nome: "Calda de Limão", preco: 1.5 },
    { id: '21', nome: "Calda de Caramelo", preco: 1.5 }
];