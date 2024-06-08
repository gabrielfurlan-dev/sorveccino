"use client";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ItemDb, ItensAcai } from "@/lib/repos/acai";
import { useEffect, useState } from "react"

export type Item = {
    id: string,
    nome: string,
    preco: number
}

export default function novopedido() {
    const [itensAcai, setItensAcai] = useState<ItensAcai>({ acompanhamentos: [], cremes: [], frutas: [], tamanhosDeCopo: [] })
    const [adicionais, setAdicionais] = useState<Item[]>([])
    const [valorCopo, setValorCopo] = useState<number>(0);

    function IncluirAdicional(adicional: Item) {
        setAdicionais([...adicionais, adicional])
    }

    function fetchData() {
        return fetch('api/acai/itens')
            .then(response => response.json())
            .then(data => {
                setItensAcai(data.itensAcai as ItensAcai)
            })
            .catch(error => {
                alert(error)
            });
    }

    useEffect(() => {
        fetchData()
    }, [])

    function ObterTotal(): number {
        let total = 0;
        adicionais.map(x => { total += x.preco })
        return total + valorCopo
    }

    return (
        <div className="p-10 flex flex-col items-center">
            <h1 className="text-3xl py-4">Açaís</h1>
            <div className="w-[800px] rounded-md grid gap-10 p-12 border">
                <div id="Tamanho Copo">
                    <p>Tamanho Copo</p>
                    <Select onValueChange={(e) => setValorCopo(Number(e))}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Selecione um tamanho" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Tamanhos</SelectLabel>
                                {itensAcai && itensAcai.tamanhosDeCopo.map(x => (
                                    <SelectItem value={x.preco.toString()}>{x.tamanho} | {Number(x.preco)}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div id="Adicionais" className="flex">
                    <div>
                        <p className="mt-10">Adicionar</p>
                        <div className="flex flex-row w-full gap-2">
                            <div className="flex flex-col">
                                <ListaAdicional categoria="Acompanhamentos" listaAdicional={itensAcai.acompanhamentos} onClick={IncluirAdicional} />
                                <ListaAdicional categoria="Frutas" listaAdicional={itensAcai.frutas} onClick={IncluirAdicional} />
                            </div>
                            <ListaAdicional categoria="Cremes" listaAdicional={itensAcai.cremes} onClick={IncluirAdicional} />
                        </div>
                    </div>
                    { adicionais && adicionais.map(x => (
                        <div className="flex flex-row gap-2">
                            <p>{x.nome}</p>
                            <p>R$:{x.preco.toFixed(2)}</p>
                        </div>
                    )) }
                    {!adicionais.length && (<p>Nenhum</p>)}
                </div>
                <hr />
                <div id="Totalizadores">
                    Total: R$: {ObterTotal().toFixed(2)}
                </div>
                <div id="submit" className="w-full">
                    <Button className="w-full">Salvar</Button>
                </div>
            </div>
        </div>
    )
}

interface ListaAdiconalProps {
    listaAdicional: ItemDb[],
    categoria: string,
    onClick: (adicional: Item) => void
}

export function ListaAdicional({ categoria, listaAdicional, onClick }: ListaAdiconalProps) {
    return (
        <div className="p-2 w-full rounded-lg">
            <p className="pb-2">{categoria}</p>
            <div>
                {
                    listaAdicional.length && listaAdicional.map(item => (
                        <div
                            className="text-sm w-[265px] px-2 py-1 flex rounded flex-row justify-between gap-2 hover:border hover:border-neutral-700 hover:bg-emerald-600"
                            onClick={() => onClick({ id: item.id, nome: item.nome, preco: Number(item.preco) })}
                        >
                            <p>{item.nome}</p>
                            <p>R$ {Number(item.preco).toFixed(2)}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}