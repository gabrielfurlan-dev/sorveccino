import { Adicional } from "@/lib/pedidos/types/Adicional"
import { Embalagem } from "@/lib/pedidos/types/Embalagem"
import { Pedido } from "@/lib/pedidos/types/Pedido"
import { db } from "@/lib/utils/db"
import { createId } from "@paralleldrive/cuid2"

export async function AdicionarPedidoPendente(pedido: Pedido): Promise<void> {
    // await db.pedidoPendente.create({ data: pedido })
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
    { id: '1', categoria: "Acompanhamentos", nome: "Paçoca", preco: 2 },
    { id: '2', categoria: "Acompanhamentos", nome: "Granola", preco: 2 },
    { id: '3', categoria: "Acompanhamentos", nome: "Amendoim Granulado", preco: 2 },
    { id: '4', categoria: "Acompanhamentos", nome: "Ouro Branco", preco: 2 },
    { id: '5', categoria: "Acompanhamentos", nome: "Sonho de Valsa", preco: 2 },
    { id: '6', categoria: "Acompanhamentos", nome: "KitKat", preco: 4 },
    { id: '7', categoria: "Acompanhamentos", nome: "Ovo Maltine", preco: 2.5 },
    { id: '8', categoria: "Acompanhamentos", nome: "Leite em Pó", preco: 2 },
    { id: '9', categoria: "Acompanhamentos", nome: "Confete", preco: 2.5 },
    { id: '10', categoria: "Cremes", nome: "Creme de Ninho", preco: 4 },
    { id: '11', categoria: "Cremes", nome: "Creme de Avelã", preco: 4 },
    { id: '12', categoria: "Cremes", nome: "Creme de Cookies Branco", preco: 4 },
    { id: '13', categoria: "Cremes", nome: "Creme de Bombom", preco: 4 },
    { id: '14', categoria: "Cremes", nome: "Nutella", preco: 7 },
    { id: '15', categoria: "Cremes", nome: "Pistache", preco: 7 },
    { id: '16', categoria: "Cremes", nome: "Creme de Coco", preco: 4 },
    { id: '17', categoria: "Cremes", nome: "Leite Condensado", preco: 1.5 },
    { id: '18', categoria: "Cremes", nome: "Calda de Chocolate", preco: 1.5 },
    { id: '19', categoria: "Cremes", nome: "Calda de Morango", preco: 1.5 },
    { id: '20', categoria: "Cremes", nome: "Calda de Limão", preco: 1.5 },
    { id: '21', categoria: "Cremes", nome: "Calda de Caramelo", preco: 1.5 },
    { id: '22', categoria: "Frutas", nome: "Morango", preco: 4 },
    { id: '23', categoria: "Frutas", nome: "Cereja", preco: 4 },
    { id: '24', categoria: "Frutas", nome: "Banana", preco: 2 }
];