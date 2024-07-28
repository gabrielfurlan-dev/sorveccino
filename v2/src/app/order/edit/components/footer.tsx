"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Control } from "react-hook-form";
import { tv } from "tailwind-variants";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditOrderForm } from "../[id]/page";

type EditFooterProps = {
  control: Control<EditOrderForm>;
  onSubmit: () => void;
};

export function EditFooter({ control, onSubmit }: EditFooterProps) {
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
      <FormField
        control={control}
        name="total"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Total do Pedido</FormLabel>
            <FormControl>
              <div>
                <span>R$ </span>
                <Input placeholder="00" type="number" {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* <FormField
        control={control}
        name="totalRecieved"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Total Recebido</FormLabel>
            <FormControl>
              <div>
                <span>R$ </span>
                <Input type="number" {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      /> */}
      <div className="flex flex-col justify-center ml-10">
        <h3 className="text-[12px]">Troco</h3>
        <h1 className="font-semibold text-[20px]">{"em construção"}</h1>
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