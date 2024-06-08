'use client';
import { CaretDown, CaretUp, PintGlass, TrashSimple } from "@phosphor-icons/react"
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useEffect, useState } from "react";

const jsonadicionais = [
    {
        id: '1',
        nome: "Morango",
        preco: 4
    },
    {
        id: '2',
        nome: "Creme de avelã",
        preco: 4
    },
]

type copoAcaiProps = {
    tamanhoCopo: number
}

export default function CopoAcai({ tamanhoCopo }: copoAcaiProps) {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [adicionais, setAdicionais] = useState<{ id: string, nome: string, preco: number }[]>(jsonadicionais)

    function RemoverAdicional(id: string) {
        setAdicionais(adicionais.filter(x => x.id != id))
    }

    return (
        <Collapsible
            open={isCollapsed}
            onOpenChange={setIsCollapsed}
            className=" border border-neutral-500 rounded"
        >
            <CollapsibleTrigger className="w-full">
                <div className=" rounded flex flex-rol items-center justify-between py-2 px-4 ">
                    <div className="flex w-full items-center gap-2">
                        <PintGlass size={24} />
                        <div className="items-end flex gap-2">
                            <span>Copo</span>
                            <span className="font-bold">{tamanhoCopo} ml</span>
                        </div>
                    </div>
                    <ColapseButton isCollapsed={isCollapsed} />
                </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="transition-all">
                <Table>
                    <TableHeader>
                    </TableHeader>
                    <TableBody>
                        {adicionais.map((adicional) => (
                            <TableRow
                                key={adicional.id}
                                className="hover:bg-neutral-900 rounded border-neutral-900"
                            >
                                <TableCell className="font-medium w-[300px]">{adicional.nome}</TableCell>
                                <TableCell className="w-[100px]">R$ {adicional.preco.toFixed(2)}</TableCell>
                                <TableCell className="text-right">
                                    <TrashSimple
                                        size={16}
                                        onClick={() => RemoverAdicional(adicional.id)}
                                        className="hover:text-red-500 text-neutral-600"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CollapsibleContent>
        </Collapsible>
    )
}
type colapseButtonProps = {
    isCollapsed: boolean
}
function ColapseButton({ isCollapsed }: colapseButtonProps) {
    return (
        isCollapsed ? <CaretUp size={24} /> : <CaretDown size={24} />
    )
}