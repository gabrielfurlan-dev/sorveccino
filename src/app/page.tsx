"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"

export default function Home() {
  const router = useRouter()

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
      <span className="text-3xl">Sorveccino</span>
      <div className="flex flex-col">
        <Button onClick={() => router.push("/pdv/pedidos/todos")} className="bg-red-500 p-4 rounded w-[200px]">Pedidos</Button>
      </div>
    </div>
  );
}
