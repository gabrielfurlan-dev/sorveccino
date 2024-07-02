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
                const response = await fetch('/api/item/itens');
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
        <ResizablePanel className="border-[1.5px] border-solid rounded-lg mt-4 mr-6 h-48">
            <div className="px-12 pt-5">
                <h1 className={`text-3xl font-semibold`}>Itens</h1>
                <ul>
                    {items.map(item => (
                        <li className="text-white" key={item.id}>{item.nome} - {item.categoria} - ${item.preco}</li>
                    ))}
                </ul>
            </div>
            <div></div>
        </ResizablePanel>
    )
}