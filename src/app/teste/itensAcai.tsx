'use client';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react"
import { adicional } from "./testeTypes";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableRow } from "@/components/ui/table";
import { cremes, tamanhosDeCopo, frutas, acompanhamentos } from "./adicionais";

export function ItensDoPedido() {
    const [precoCopo, setPrecoCopo] = useState<string>()
    const [adicionais, setAdicionais] = useState<adicional[]>()

    return (
        <div className="flex flex-row gap-2">
            <div className="flex flex-col">
                {adicionais && adicionais.map(x => (
                    <span className="">{x.nome} - R$ {x.preco.toFixed(2)}</span>
                ))}
            </div>
            <div>
                <Select onValueChange={(e) => setPrecoCopo(e)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione um tamanho" />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-900 text-white border-neutral-800">
                        <SelectGroup className="">
                            <SelectLabel>Tamanhos</SelectLabel>
                            {tamanhosDeCopo.length && tamanhosDeCopo.map(x => (
                                <SelectItem value={x.preco.toString()} key={x.id}>
                                    <div className="flex flex-row justify-between gap-4">
                                        <span>{x.nome}</span>
                                        <span>R$ {x.preco.toFixed(2)}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <MenuAdicional nomeAdicional="Cremes" adicionais={cremes} setAdicionais={setAdicionais} />
                <MenuAdicional nomeAdicional="Frutas" adicionais={frutas} setAdicionais={setAdicionais} />
                <MenuAdicional nomeAdicional="Acompanhamentos" adicionais={acompanhamentos} setAdicionais={setAdicionais} />
            </div>
        </div>
    )
}

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


type MenuAdicionalProps = {
    nomeAdicional: string,
    adicionais: adicional[],
    setAdicionais: (adicionais: adicional[]) => void
}
export function MenuAdicional({ nomeAdicional, adicionais, setAdicionais }: MenuAdicionalProps) {

    function handleCheckboxChange(novoAdicional: adicional) {
        if (adicionais.find(x => x.id == novoAdicional.id)) {
            setAdicionais(adicionais.filter(x => x.id != novoAdicional.id))
        } else {
            setAdicionais([...adicionais, novoAdicional])
        }
    };

    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>{nomeAdicional}</AccordionTrigger>
                <AccordionContent>
                    <Table className="py-4 flex flex-col gap-2">
                        <TableBody>
                            {adicionais && adicionais.map(x => (
                                <TableRow className="flex flex-row justify-between hover:bg-neutral-800 px-2 py-2 border-neutral-800 items-center">
                                    <Checkbox
                                        className="w-5 h-5 mr-4 items-center justify-center flex flex-row gap-4 border-neutral-50"
                                        checked={adicionais.find(x => x.id == x.id) ? true : false}
                                        onCheckedChange={() => handleCheckboxChange(x)}
                                    />
                                    <span className="w-full">{x.nome}</span>
                                    <span className="w-[90px]">R$ {x.preco.toFixed(2)}</span>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </AccordionContent>
            </AccordionItem>
        </Accordion >
    )
}