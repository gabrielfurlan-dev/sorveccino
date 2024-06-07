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

    function AdicionarPedidoAcai(){
        
    }

    return (
        <div className="p-10">
            <h1 className="text-3xl py-4">Pagina de cadastrar pedido</h1>

            <div className="grid gap-10">
                <div id="Tamanho Copo">
                    <p>Tamanho Copo</p>
                    <Select onValueChange={(e) => setValorCopo(Number(e))}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Selecione um tamanho" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Tamanhos</SelectLabel>
                                {
                                    itensAcai && itensAcai.tamanhosDeCopo.map(x => (
                                        <SelectItem value={x.preco.toString()}>{x.tamanho} | {Number(x.preco)}</SelectItem>
                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <hr />
                <div id="Adicionais">
                    <p className="text-xl">Acompanhamentos</p>

                    {adicionais && adicionais.map(x => (
                        <div className="flex flex-row gap-2">
                            <p>{x.nome}</p>
                            <p>R$:{x.preco.toFixed(2)}</p>
                        </div>
                    ))}
                    {!adicionais.length && (<p>Nenhum</p>)}
                    <div>
                        <p className="mt-10">Adicionar</p>

                        <div className="flex flex-row w-full gap-2">
                            <ListaAdicional categoria="Acompanhamentos" listaAdicional={itensAcai.acompanhamentos} onClick={IncluirAdicional} />
                            <ListaAdicional categoria="Cremes" listaAdicional={itensAcai.cremes} onClick={IncluirAdicional} />
                            <ListaAdicional categoria="Frutas" listaAdicional={itensAcai.frutas} onClick={IncluirAdicional} />
                        </div>

                    </div>
                </div>
                <hr />
                <div id="Totalizadores">
                    Total: R$: {ObterTotal().toFixed(2)}
                </div>
                <div>
                    <Button>Salvar</Button>
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
        <div className="p-2 border w-full rounded-lg">
            <p className="pb-2">{categoria}</p>
            <div>
                {
                    listaAdicional.length && listaAdicional.map(item => (
                        <div
                            className="flex flex-row justify-between gap-2 p-2 border hover:bg-emerald-600"
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