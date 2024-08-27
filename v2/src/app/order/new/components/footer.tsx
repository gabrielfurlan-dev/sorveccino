"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Control, useWatch } from "react-hook-form";
import { tv } from "tailwind-variants";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NewOrderForm } from "@/lib/Backend/Order/Types/Commands/NewOrderForm";

type FooterProps = {
  control: Control<NewOrderForm>;
  onSubmit: () => void;
};

export function Footer({ control, onSubmit }: FooterProps) {
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

  // Use watch to observe changes in form values
  const total = useWatch({ control, name: "total" });
  const totalRecieved = useWatch({ control, name: "totalRecieved" });
  const troco = (totalRecieved || 0) - (total || 0);

  return (
    <div className="flex w-full px-20 items-center py-2 mt-auto fixed bottom-10">
      <div className="flex gap-3">
        <FormField
          control={control}
          name="total"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total do Pedido</FormLabel>
              <FormControl>
                <div className="flex items-center text-xl">
                  <FormLabel className="text-xl pr-2">R$</FormLabel>
                  <Input placeholder="00" type="number" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="totalRecieved"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Recebido</FormLabel>
              <FormControl>
                <div className="flex items-center text-xl">
                  <FormLabel className="text-xl pr-2">R$</FormLabel>
                  <Input type="number" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="troco"
          render={() => (
            <FormItem>
              <FormLabel>Troco</FormLabel>
              <FormControl>
                <div className="flex items-center text-xl h-[40px]">
                  <FormLabel className="text-xl">                    
                    {troco >= 0 ? `R$ ${troco.toFixed(2)}` : "Valor insuficiente"}
                  </FormLabel>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <div className="flex gap-x-4 ml-auto">
        <Link className={footerButtonsStyle({ type: "back" })} href={"/order/all"}>
          Voltar
        </Link>
        <Link className={footerButtonsStyle({ type: "delete" })} href={"/order/new"}>
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