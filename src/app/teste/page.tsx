'use client';
import { useState } from "react";
import CopoAcai from "./copoAcai";
import { Plus } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
type adicionais = {
    id: string,
    nome: string,
    preco: number
}
type pedido = {
    tamanhoCopo: number,
    adicionais: adicionais[]
}

export default function teste() {
    const [pedidos, setPedidos] = useState<pedido[]>([])
    const [adicionandoPedido, setAdicionandoPedido] = useState<boolean>(false)
    function AdicionarCopo(): void {
        setAdicionandoPedido(true)
    }

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-[400px] flex flex-col gap-2">
                {
                    pedidos.map(x => (
                        <CopoAcai tamanhoCopo={x.tamanhoCopo} />
                    ))
                }
                <div className="flex justify-center">
                    <Button
                        className="flex flex-row w-full gap-2"
                        onClick={() => AdicionarCopo()}
                    >
                        Adicionar
                        <Plus />
                    </Button>
                </div>
            </div>
        </div>
    )
}