"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"

export default function Home() {

  const router = useRouter()

  function AbrirTelaDeNovoPedido() {
    router.push("novopedido")
  }
  return (
    <>
      Sorveccino

      <div className="flex flex-col">
        Pedidos
        <Button onClick={() => AbrirTelaDeNovoPedido()} className="bg-red-500 p-4 rounded w-[200px]">Cadastrar novo Pedido</Button>
      </div>

    </>
  );
}
