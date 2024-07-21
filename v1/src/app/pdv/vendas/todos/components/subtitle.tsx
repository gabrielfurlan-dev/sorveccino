"use client"

import { CaretLeft } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";

export function Subtitle() {
    const router = useRouter()
    return (
        <div className="flex w-full pl-12 items-center">
            <CaretLeft size={18} className="font-semibold cursor-pointer" onClick={() => router.push('/inicio')} />
            <div className="flex ml-2 gap-x-2 items-center">
                <h1 className="text-[15px] font-semibold cursor-pointer">Vendas</h1>
                <p className="text-[15px]">/</p>
                <h1 className="text-[15px] ">Todos</h1>
            </div>
        </div>
    );
}