import Link from "next/link";

export function Footer() {
  return (
    <div className="flex w-full px-20 items-center py-2 mt-auto fixed bottom-10">
      <div className="flex flex-col justify-center">
        <h3 className="text-[12px]">Total do Pedido</h3>
        <h1 className="font-semibold text-[20px]">R$ 100,00</h1>
      </div>
      <div className="flex flex-col justify-center ml-10">
        <h3 className="text-[12px]">Restante</h3>
        <h1 className="font-semibold text-[20px]">R$ 80,00</h1>
      </div>
      <div className="flex gap-x-4 ml-auto">
        <Link
          className="bg-transparent border-orange-900 text-[13px] hover:bg-orange-900 hover:border-orange-900 h-[45px] rounded-lg w-[160px] border-2"
          href={"/order/all"}
        >
          Voltar
        </Link>
        <Link
          className="bg-transparent border-red-900 text-[13px] hover:bg-red-900 hover:border-red-900 h-[45px] rounded-lg w-[160px] border-2"
          href={"/order/new"}
        >
          Excluir
        </Link>
        <Link
          className="bg-transparent border-green-900 text-[13px] hover:bg-green-900 hover:border-green-900 h-[45px] rounded-lg w-[160px] border-2"
          href={"/order/new"}
        >
          Salvar
        </Link>
      </div>
    </div>
  );
}
