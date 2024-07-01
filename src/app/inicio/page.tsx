"use client";

import { NavBar } from "@/components/sorveccino-ui/Navbar";
import { CardInitialPage } from "@/components/sorveccino-ui/CardInitialPage";
import { ShoppingCart, Package, Invoice } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function InitialPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('/');
        }
    }, [status, router]);

    if (status === "loading") {
        return <div>Carregando...</div>;
    }

    return (
        <div className="flex flex-col w-full h-[100vh]">
            {session && (
                <>
                    <NavBar href="Início" />
                    <div className="flex h-full items-center justify-center gap-x-6">
                        <CardInitialPage icon={<ShoppingCart size={31} />} route="sale" text="Vendas" />
                        <CardInitialPage icon={<Package size={31} />} route="stock" text="Estoque" />
                        <CardInitialPage icon={<Invoice size={31} />} route="finance" text="Finanças" />
                        <CardInitialPage icon={<Invoice size={31} />} route="pdv/pedidos/todos" text="Pedidos" />
                    </div>
                </>
            )}
        </div>
    );
}