import { Decimal } from "@prisma/client/runtime/library";
import { db } from "../utils/db";
import { Item } from "@/app/novopedido/page";

export type ItemDb = {
    id: string,
    nome: string,
    preco: Decimal
}

export type ItensAcai = {
    acompanhamentos: ItemDb[],
    cremes: ItemDb[],
    frutas: ItemDb[],
    tamanhosDeCopo: TamanhoCopo[]
}

type TamanhoCopo = {
    id: string,
    tamanho: string,
    preco: Decimal
}

export async function obterItensDeAcai(): Promise<ItensAcai> {
    const tamanhoCopos = await db.tamanhoCoposAcai.findMany({
        select: {
            id: true,
            preco: true,
            tamanho: true
        }
    })
    const acompanhamentos = await db.acompanhamentos.findMany({
        select: {
            id: true,
            preco: true,
            nome: true
        }
    })
    const cremes = await db.cremes.findMany({
        select: {
            id: true,
            preco: true,
            nome: true
        }
    })
    const frutas = await db.frutas.findMany({
        select: {
            id: true,
            preco: true,
            nome: true
        }
    })
    return {
        acompanhamentos: acompanhamentos,
        cremes: cremes,
        frutas: frutas,
        tamanhosDeCopo: tamanhoCopos
    }
}

export type adicionarPedidoAcaiProps = {
    tamanhoCopoId: string,
    adicionais: Item[],
    cobrarTaxaEntrega: boolean
}

export async function AdicionarPedidoAcai({ adicionais, tamanhoCopoId, cobrarTaxaEntrega }: adicionarPedidoAcaiProps): Promise<void> {

    const adicionaisInseridos = adicionais.map(async (x) => {
        return await db.item.create({
            data: {
                nome: x.nome,
                id: x.id,
                preco: x.preco
            }
        })
    })

    await db.pedidoAcai.create({
        data: {
            itens: ,
            cobrarTaxaEntrega,
            tamanhoCoposAcaiId: tamanhoCopoId
        }
    })
}