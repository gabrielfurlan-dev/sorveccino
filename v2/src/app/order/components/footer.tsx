"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { tv } from "tailwind-variants";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Control } from "react-hook-form";
import { NewOrderForm } from "@/lib/Backend/Order/Types/Commands/NewOrderForm";
import { FormField, FormItem } from "@/components/ui/form";
import { UpdateOrderCommand } from "@/lib/Backend/Order/Types/Commands/UpdateOrderCommand";

type FooterProps = {
  total: number;
  change: number;
  control: Control<NewOrderForm> | Control<UpdateOrderCommand>;
  onSubmit: () => void;
};

export function Footer({ total, onSubmit, change, control }: FooterProps) {
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

  return (
    <div className="flex w-full px-20 items-center py-2 mt-auto fixed bottom-10">
      <div className="flex gap-3">
        <div className="flex flex-col">
          <Label>Total do Pedido</Label>
          <div className="flex items-center flex-row text-xl">
            <p className="text-xl pr-2">R$</p>
            <p>{total}</p>
          </div>
        </div>
        <div className="flex items-center text-xl">
          <Label className="text-xl pr-2">R$</Label>

          <FormField
            control={control}
            name="totalRecieved"
            render={({ field }) => {
              return <Input {...field} type="number" />;
            }}
          />
        </div>
        <div className="flex flex-col items-center text-xl h-[40px]">
          <Label className="text-xl pr-2">Troco</Label>
          <p className="text-xl">{`R$ ${change.toFixed(2)}`}</p>
        </div>
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
          type="submit"
          onClick={onSubmit}
          className={footerButtonsStyle({ type: "save" })}
        >
          Salvar
        </Button>
      </div>
    </div>
  );
}
