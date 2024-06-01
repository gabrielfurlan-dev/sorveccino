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
import { ItensAcai, obterItensDeAcai } from "@/lib/repos/acai";
import { useEffect, useState } from "react"

export type Acompanhamento = {
    id: string,
    nome: string,
    preco: number
}


export default function novopedido() {
    const [acompanhamentos, setAcompanhamentos] = useState<Acompanhamento[]>([])
    const [valorCopo, setValorCopo] = useState<number>(0);
    const [itensAcai, setItensAcai] = useState<ItensAcai>()

    function fetchData() {
        return fetch('/acai/itens')
            .then(response => response.json())
            .then(data => {
                setItensAcai(data.json() as ItensAcai)
            })
            .catch(error => {
                alert(error)
            });
    }

    useEffect(() => {
        fetchData()
    }, [])

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
                            itensAcai && itensAcai.tamanhosDeCopo.map(x => (
                                <option id={x.id} value={Number(x.preco)}>
                                    {x.tamanho} | {Number(x.preco)}
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

                    {!acompanhamentos.length && (<p>Nenhum</p>)}

                    <div>
                        <p className="mt-10">Adicionar</p>
                        {
                            itensAcai && itensAcai.acompanhamentos.map(x => (
                                <button
                                    key={x.id}
                                    onClick={() => AdicionarAcompanhamento({ id: x.id, nome: x.nome, preco: Number(x.preco) })}
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