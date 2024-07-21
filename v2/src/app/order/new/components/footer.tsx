"use client";
import { Button } from "@/components/ui/button";
import { Add } from "@/lib/Backend/UseCases/OrderUseCases";
import { queryClient } from "@/lib/utils/reactQuery";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "sonner";
import { tv } from "tailwind-variants";

type FooterProps = {
  orderDescription: string;
  customerName: string;
  customerNotes: string;
};

export function Footer({
  orderDescription,
  customerName: customerClient,
  customerNotes,
}: FooterProps) {
  const footerButtonsStyle = tv({
    base: "dark:text-white flex items-center justify-center text-black bg-transparent text-[13px] h-[45px] rounded-lg w-[160px] border-2",
    variants: {
      type: {
        back: "border-orange-900 hover:bg-orange-900 hover:border-orange-900",
        save: "border-green-900 hover:bg-green-900 hover:border-green-900",
        delete: "border-red-900 hover:bg-red-900 hover:border-red-900",
      },
    },
  });
  const { mutateAsync: addOrder } = useMutation({
    mutationFn: Add,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  async function handleAddOrder() {
    try {
      await addOrder({
        id: "1",
        total: 0,
        createdAt: new Date(),
        totalToRecieve: 100,
        customer: { name: customerClient, notes: customerNotes },
        description: orderDescription,
      });
      toast.success("Pedido adicionado.");
    } catch (error) {
      toast.error("Ocorreu um erro ao adicionar o pedido.");
    }
  }

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
          className={footerButtonsStyle({ type: "back" })}
          href={"/order/all"}
        >
          Voltar
        </Link>
        <Link
          className={footerButtonsStyle({ type: "delete" })}
          href={"/order/new"}
        >
          Excluir
        </Link>
        <Button
          className={footerButtonsStyle({ type: "save" })}
          onClick={handleAddOrder}
        >
          Salvar
        </Button>
      </div>
    </div>
  );
}
