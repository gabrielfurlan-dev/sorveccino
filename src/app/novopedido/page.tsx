"use client";
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

const acompanhamentosVenda: Acompanhamento[] = [
    { id: "1", nome: "Paçoca", preco: 2 },
    { id: "2", nome: "Granola", preco: 2 },
    { id: "3", nome: "Amendoim Granulado", preco: 2 },
    { id: "4", nome: "Ouro Branco", preco: 2 },
    { id: "5", nome: "Sonho de Valsa", preco: 2 },
    { id: "6", nome: "KitKat", preco: 4 },
    { id: "7", nome: "Ovo Maltine", preco: 2.5 },
    { id: "8", nome: "Leite em Pó", preco: 2 },
    { id: "9", nome: "Confete", preco: 2.5 },

    //Cremes
    { id: "10", nome: "Creme de Ninho", preco: 4 },
    { id: "11", nome: "Creme de Avelã", preco: 4 },
    { id: "12", nome: "Creme de Cookies Branco", preco: 4 },
    { id: "13", nome: "Creme de Bombom", preco: 4 },
    { id: "14", nome: "Nutella", preco: 7 },
    { id: "15", nome: "Pistache", preco: 7 },
    { id: "16", nome: "Creme de Coco", preco: 4 },
    { id: "17", nome: "Leite Condensado", preco: 1.50 },
    { id: "18", nome: "Calda de Chocolate", preco: 1.50 },
    { id: "19", nome: "Calda de Morango", preco: 1.50 },
    { id: "20", nome: "Calda de Limão", preco: 1.50 },
    { id: "21", nome: "Calda de Caramelo", preco: 1.50 },

    //Frutas
    { id: "22", nome: "Morango", preco: 4 },
    { id: "23", nome: "Banana", preco: 2 },
    { id: "24", nome: "Cereja", preco: 4 },

]

const coposVenda: Acompanhamento[] = [

    { id: "25", nome: "330ml", preco: 10 },
    { id: "26", nome: "440ml", preco: 12 },
    { id: "27", nome: "550ml", preco: 14 },
    { id: "28", nome: "7700ml", preco: 16 },
    { id: "29", nome: "1L", preco: 24 },
]

export type Acompanhamento = {
    id: string,
    nome: string,
    preco: number
}

export default function novopedido() {
    const [acompanhamentos, setAcompanhamentos] = useState<Acompanhamento[]>([])
    const [valorCopo, setValorCopo] = useState<number>(0);

    function AdicionarAcompanhamento({ id, nome, preco }: Acompanhamento) {
        setAcompanhamentos([...acompanhamentos, { id, nome, preco }])
    }

    function ObterTotal(): number {
        let total = 0;
        acompanhamentos.map(x => { total += x.preco })
        return total + valorCopo
    }

    return (
        <div className="p-10">
            <h1 className="text-3xl py-4">Pagina de cadastrar pedido</h1>

            <div className="grid gap-10">
                <div id="Tamanho Copo">
                    <p>Tamanho Copo</p>
                    <select name="" id="" onChange={(e) => setValorCopo(Number(e.target.value))}>
                        {
                            coposVenda.map(x => (
                                <option id={x.id} value={x.preco}>
                                    {x.nome} | {x.preco}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <hr />

                <div id="Adicionais">
                    <p className="text-xl">Acompanhamentos</p>
                    {acompanhamentos && acompanhamentos.map(x => (
                        <div className="flex flex-row gap-2">
                            <p>{x.nome}</p>
                            <p>R$:{x.preco.toFixed(2)}</p>
                        </div>
                    ))}
                    {
                        !acompanhamentos.length && (
                            <p>Nenhum</p>
                        )
                    }

                    <div>
                        <p className="mt-10">Adicionar</p>
                        {
                            acompanhamentosVenda.map(x => (
                                <button
                                    key={x.id}
                                    onClick={() => AdicionarAcompanhamento({ id: x.id, nome: x.nome, preco: x.preco })}
                                    className="p-2 border hover:bg-green-200"
                                >{x.nome}</button>
                            ))
                        }
                    </div>
                </div>

                <hr />

                <div id="Totalizadores">
                    Total: R$: {ObterTotal().toFixed(2)}
                </div>

            </div>
        </div>
    )
}