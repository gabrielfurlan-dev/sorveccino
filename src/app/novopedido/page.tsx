"use client";
import { Button } from "@/components/ui/button";
import { ItemDb, ItensAcai } from "@/lib/repos/acai";
import { useEffect, useState } from "react"

export type Item = {
    id: string,
    nome: string,
    preco: number
}


export default function novopedido() {

    const [adicionais, setAdicionais] = useState<Item[]>([])
    const [valorCopo, setValorCopo] = useState<number>(0);
    const [itensAcai, setItensAcai] = useState<ItensAcai>({ acompanhamentos: [], cremes: [], frutas: [], tamanhosDeCopo: [] })

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
                <Button onClick={() => AdicionarPedidoAcai()}>Salvar</Button>
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
                            className="py-2 rounded-lg flex flex-row justify-between gap-2 p-2 border hover:bg-green-200"
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