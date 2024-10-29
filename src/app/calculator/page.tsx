"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";

const ItemSchema = z.object({
  quantidade: z.coerce.number(),
  preco: z.coerce.number(),
});

type Item = z.infer<typeof ItemSchema>;

const IceCreamItemsSchema = z.object({
  sorvete: ItemSchema,
  leiteEmPo: ItemSchema,
  leiteVaca: ItemSchema,
  saborizante: ItemSchema,
  acucar: ItemSchema,
  ligaNeutra: ItemSchema,
  emulcificante: ItemSchema,
  mescla: ItemSchema,
});

type IceCreamItems = z.infer<typeof IceCreamItemsSchema>;

export default function Calculator() {
  const form = useForm<IceCreamItems>({
    resolver: zodResolver(IceCreamItemsSchema),
  });

  function HandleSubmit() {
    const totalSorvete =
      form.getValues("sorvete.quantidade") * form.getValues("sorvete.preco");
    const totalLeiteEmPo =
      form.getValues("leiteEmPo.quantidade") *
      form.getValues("leiteEmPo.preco");
    const totalLeiteVaca =
      form.getValues("leiteVaca.quantidade") *
      form.getValues("leiteVaca.preco");
    const totalSaborizante =
      form.getValues("saborizante.quantidade") *
      form.getValues("saborizante.preco");
    const totalAcucar =
      form.getValues("acucar.quantidade") * form.getValues("acucar.preco");

    const total =
      totalSorvete +
      totalLeiteEmPo +
      totalLeiteVaca +
      totalSaborizante +
      totalAcucar;
      
    alert(`Total: R$ ${total.toFixed(2)}`);

    form.reset();
  }

  return (
    <Form {...form}>
      <form
        className="w-full flex flex-col h-screen justify-center items-center"
        onSubmit={form.handleSubmit(HandleSubmit)}
      >
        <ItemInput
          name="sorvete"
          form={form}
          quantityFieldName="sorvete.quantidade"
          priceFieldName="sorvete.preco"
        />
        <ItemInput
          name="leiteEmPo"
          form={form}
          quantityFieldName="leiteEmPo.quantidade"
          priceFieldName="leiteEmPo.preco"
        />
        <ItemInput
          name="leiteVaca"
          form={form}
          quantityFieldName="leiteVaca.quantidade"
          priceFieldName="leiteVaca.preco"
        />
        <ItemInput
          name="saborizante"
          form={form}
          quantityFieldName="saborizante.quantidade"
          priceFieldName="saborizante.preco"
        />
        <ItemInput
          name="acucar"
          form={form}
          quantityFieldName="acucar.quantidade"
          priceFieldName="acucar.preco"
        />
        <Button className="mt-6 w-[400px]" type="submit">
          Calcular
        </Button>
      </form>
    </Form>
  );
}

interface ItemInputProps {
  form: UseFormReturn<IceCreamItems>;
  name: string;
  quantityFieldName:
    | "sorvete.quantidade"
    | "leiteEmPo.quantidade"
    | "leiteVaca.quantidade"
    | "saborizante.quantidade"
    | "acucar.quantidade"
    | "ligaNeutra.quantidade"
    | "emulcificante.quantidade"
    | "mescla.quantidade";
  priceFieldName:
    | "sorvete.preco"
    | "leiteEmPo.preco"
    | "leiteVaca.preco"
    | "saborizante.preco"
    | "acucar.preco"
    | "ligaNeutra.preco"
    | "emulcificante.preco"
    | "mescla.preco";
}
function ItemInput({
  form,
  name,
  quantityFieldName,
  priceFieldName,
}: ItemInputProps) {
  return (
    <div>
      <Label>{name}</Label>
      <div className="flex gap-x-2">
        <FormField
          control={form.control}
          name={quantityFieldName}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantidade</FormLabel>
              <FormControl>
                <Input className="" placeholder="" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={priceFieldName}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preco</FormLabel>
              <FormControl>
                <Input className="" placeholder="" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}