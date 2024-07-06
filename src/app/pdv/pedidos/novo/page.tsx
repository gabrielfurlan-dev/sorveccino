"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus, X } from "@phosphor-icons/react/dist/ssr";
import { Aditional } from "@/lib/orders/types/Adicional";
import { ListaAdicionais } from "@/data/PedidoPentente";
import { Controller, Control } from "react-hook-form";
import { z } from "zod";
import { BotaoAcai } from "./components/BotaoAcai";
import { useQuery } from "@tanstack/react-query";

export default function NovoCopo() {
  const { data: pedidoAtual } = useQuery({
    queryFn: () => [],
    queryKey: ["pedidoAtual"],
  });

  return (
    <div className="w-full h-[90vh] flex items-center justify-center">
      <BotaoAcai />
      <div>
        <span>Pedidos</span>
        <div>{
            data && data.map
        }</div>
      </div>
    </div>
  );
}

export const pedidoSchema = z.object({
  nomeCliente: z.string(),
  embalagem: z.object({
    id: z.string(),
    categoria: z.string(),
    nome: z.string(),
    tamanho: z.number(),
    unidadeMedida: z.string(),
    preco: z.number(),
  }),
  adicionais: z.array(
    z
      .object({
        id: z.string(),
        nome: z.string(),
        preco: z.number(),
        categoria: z.string(),
      })
      .nullable()
  ),
});

export type PedidoSchema = z.infer<typeof pedidoSchema>;

type ComboBoxAdicionaisProps = {
  control: Control<PedidoSchema>;
};

export function ComboBoxAdicionaisHookForm({
  control,
}: ComboBoxAdicionaisProps) {
  return (
    <Controller
      name="adicionais"
      control={control}
      defaultValue={[]}
      render={({ field }) => {
        const { onChange, value = [] } = field;
        const nonNullValue = value.filter(
          (item) => item !== null
        ) as Aditional[];

        const addItem = (adicional: Aditional) => {
          if (!nonNullValue.some((item) => item.id === adicional.id)) {
            onChange([...nonNullValue, adicional]);
          }
        };

        const removeItem = (id: string) => {
          onChange(nonNullValue.filter((item) => item.id !== id));
        };

        return (
          <Popover>
            <div>
              {nonNullValue.map((adicional: Aditional) => (
                <div
                  key={adicional.nome}
                  className="flex flex-row justify-between items-center gap-2"
                >
                  <div className="w-full dark:text-neutral-500 text-neutral-800 flex flex-row justify-between">
                    <span>{adicional.nome}</span>
                    <span>
                      {adicional.preco.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </div>
                  <span onClick={() => removeItem(adicional.id ?? "")}>
                    <X
                      className="dark:text-neutral-500 text-neutral-800 hover:dark:text-red-500"
                      size={18}
                    />
                  </span>
                </div>
              ))}
            </div>
            <PopoverTrigger asChild>
              <Button variant="secondary" className="hover:bg-purple-500 py-4">
                <Plus size={24} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Selecione um Adicional..." />
                <CommandList>
                  <CommandEmpty>Nenhum adicional encontrado.</CommandEmpty>
                  <CommandGroup>
                    {ListaAdicionais.map((adicional: Aditional) => (
                      <CommandItem
                        key={adicional.id}
                        value={adicional.id}
                        onSelect={() => addItem(adicional)}
                      >
                        {adicional.nome}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        );
      }}
    />
  );
}
