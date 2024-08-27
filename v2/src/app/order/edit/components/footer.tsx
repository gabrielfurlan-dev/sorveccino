"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Control, useForm } from "react-hook-form";
import { tv } from "tailwind-variants";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UpdateOrderCommand } from "@/lib/Backend/Order/Types/Commands/UpdateOrderCommand";
import { useEffect, useState } from "react";

type EditFooterProps = {
  control: Control<UpdateOrderCommand>;
  onSubmit: () => void;
  formWatch: (name: string) => any;
};

export function EditFooter({ control, onSubmit, formWatch: useFormWatch }: EditFooterProps) {
  const [change, setChange] = useState(0);

  useEffect(() => {
    const total = useFormWatch("total");
    const totalToRecieve = useFormWatch("totalToRecieve");
    console.log(total, totalToRecieve);
    setChange(total - totalToRecieve);
  }, [useFormWatch("total"), useFormWatch("totalToRecieve")]);

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
        <FormField
          control={control}
          name="total"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total do Pedido</FormLabel>
              <FormControl>
                <div className="flex items-center text-xl">
                  <FormLabel className="text-xl pr-2">R$</FormLabel>
                  <Input id="total" placeholder="00,00" type="number" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="totalToRecieve"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Recebido</FormLabel>
              <FormControl>
                <div className="flex items-center text-xl">
                  <FormLabel className="text-xl pr-2">R$</FormLabel>
                  <Input
                    id="totalToRecieve"
                    placeholder="00,00"
                    type="number"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="total"
          render={() => (
            <FormItem>
              <FormLabel>Troco</FormLabel>
              <FormControl>
                <div className="flex items-center text-xl h-[40px]">
                  <FormLabel className="text-xl">
                    {change >= 0 ? `${change.toFixed(2)}` : "Valor insuficiente"}
                  </FormLabel>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <div className="flex gap-x-4 ml-auto">
        <Link
          className={footerButtonsStyle({ type: "back" })}
          href={"/order/all"}
        >
          Voltar
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