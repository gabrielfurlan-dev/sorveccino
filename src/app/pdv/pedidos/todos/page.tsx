"use client"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { LayoutPedidos } from "./layouts/layoutPedido";
import { NavBar } from "@/components/sorveccino-ui/Navbar";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import { PintGlass, CaretRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";

const poppins = Poppins({
    subsets: ["latin"],
    weight: '400',
});

interface Item {
    id: string;
    nome: string;
    categoria: string;
    preco: number;
}

export default function Pedidos() {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        async function fetchItems() {
            console.log()
            try {
                const response = await fetch('/api/item');
                if (!response.ok) {
                    throw new Error('Erro ao buscar itens');
                }
                const data = await response.json();
                console.log(data)
                setItems(data);
            } catch (error) {
                console.error('Erro ao buscar itens:', error);
            }
        }
        fetchItems();
    }, []);

    return (
        <div className="flex flex-col w-full h-[90vh]">
            <NavBar href="Pedidos" />
            <ResizablePanelGroup style={{ border: 0 }}
                direction="horizontal"
                className="w-full rounded-lg border"
            >
                <ResizablePanel>
                    <LayoutPedidos />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel>
                    <div className="px-2">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink>
                                        <p className={`text-base ${poppins.className}`}>Gabriel Furlan</p>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage className={`text-base ${poppins.className}`}>Itens</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <Itens items={items} />
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}

function Itens({ items }: { items: Item[] }) {
    return (
        <ResizablePanel className="border-[1.5px] border-solid rounded-lg mt-4 mr-6">
            <div className="px-12 pt-5">
                <h1 className={`text-3xl font-semibold pb-5`}>Itens</h1>
                <div className="pl-3">
                    {items.map(item => (
                        <div className="text-white h-16" key={item.id}>

                            {item.nome} - {item.categoria} - ${item.preco}
                        </div>
                    ))}
                </div>
                <div className="flex pl-3 border-t-2 h-[70px]">
                    <div className="flex items-center w-full">
                        <div className="px-3">
                            <PintGlass size={29} />
                        </div>
                        <div className="w-fit">
                            <h1>Copo 330ml</h1>
                            <h2 className="text-neutral-400 text-[13px]">Morango, banana e creme de avelã</h2>
                        </div>
                    </div>
                    <div className="flex w-full justify-end items-center gap-x-3">
                        <h1 className="text-[15px]">R$ 9,90</h1>
                        <Button variant="ghost" size="icon">
                            <CaretRight size={20}/>
                        </Button>
                    </div>
                </div>
            </div>
            <div></div>
        </ResizablePanel>
    )
}