'use client';
import { useState } from "react";
import CopoAcai from "./copoAcai";
import { Plus } from "@phosphor-icons/react";
import { pedido } from "./testeTypes";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ItensDoPedido } from "./itensAcai";

export default function teste() {
    const [pedidos, setPedidos] = useState<pedido[]>([])
    const [adicionandoPedido, setAdicionandoPedido] = useState<boolean>(false)

    function AdicionarCopo(): void {
        setAdicionandoPedido(true)
    }

    return (
        <div className="w-full h-screen flex justify-center items-center">

            <div className="w-[400px] flex flex-col gap-2">
                {pedidos.map(x => (<CopoAcai tamanhoCopo={x.tamanhoCopo} />))}

                {/* <Dialog open={adicionandoPedido} onOpenChange={setAdicionandoPedido}>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="flex gap-2" onClick={() => AdicionarCopo()} >
                            <span>Adicionar</span>
                            <Plus />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Adicionar Pedido</DialogTitle>
                            <DialogDescription>Escolha o tamanho do copo e os acompanhamentos do pedido depois clique em salvar.</DialogDescription>
                        </DialogHeader>
                        <ItensDoPedido />
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog> */}

                <ItensDoPedido />

            </div>
        </div>
    )
}
