"use client";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Textarea } from "@/components/ui/textarea";
import { Footer } from "../components/footer";
import { Structure } from "@/components/sorveccino-ui/structure";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/utils/reactQuery";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  NewOrderForm,
  NewOrderFormSchema,
} from "@/lib/Backend/Order/Types/Commands/NewOrderForm";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { OrderItemHud } from "../components/orderItemHud";

export default function NewOrder() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<NewOrderForm["items"]>([]);
  const [total, setTotal] = useState(0);
  const [totalChange, setTotalChange] = useState(0);

  useEffect(() => {
    setTotal(items.reduce((acc, item) => acc + item.value, 0));
    form.setValue("items", items);
  }, [items]);

  const form = useForm<NewOrderForm>({
    resolver: zodResolver(NewOrderFormSchema),
    defaultValues: {
      customer: {
        name: "Cliente Padrão",
      },
    },
  });

  useEffect(() => {
    const totalRecieved = form.getValues("totalRecieved");
    if (!totalRecieved || !total) setTotalChange(0);
    else setTotalChange(totalRecieved - total);
  }, [form.watch("totalRecieved")]);

  const { mutateAsync: addOrder } = useMutation({
    mutationFn: async (order: NewOrderForm) => {
      const response = await fetch("/api/order/new", {
        method: "POST",
        body: JSON.stringify(order),
      });

      if (!response.ok) throw new Error("Erro ao adicionar o pedido.");

      return response.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  async function onSubmit() {
    if (isLoading) return; // Prevent multiple submissions

    setIsLoading(true);

    try {
      const values = form.getValues();

      if (!NewOrderFormSchema.parse(values)) return;

      await addOrder({
        total: values.total,
        totalRecieved: values.totalRecieved,
        customer: {
          name: values.customer.name,
          notes: values.customer.notes,
        },
        description: values.description,
        troco: values.troco,
        items: values.items,
      });

      toast.success("Pedido adicionado com sucesso.");
      router.push("/order/all");
    } catch (error) {
      toast.error(`Ocorreu um erro ao adicionar o pedido. ${error}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Structure>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="px-20 h-[80vh]">
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel className="">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl">
                        Descrição do Pedido
                      </FormLabel>
                      <div className="px-2">
                        <FormControl>
                          <Textarea
                            className=""
                            placeholder="Adicione os produtos do seu pedido"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <OrderItemHud items={items} setItems={setItems} />
              </ResizablePanel>
              <ResizableHandle className="invisible" />
              <ResizablePanel>
                <FormLabel className="text-xl">Dados Pessoais</FormLabel>
                <div className="py-6 px-2">
                  <FormField
                    control={form.control}
                    name="customer.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Cliente</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Cliente Padrão"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="customer.notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Observações</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Adicione o endereço do cliente e a forma de pagamento"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
          <Footer
            control={form.control}
            total={total}
            change={totalChange}
            onSubmit={onSubmit}
          />
        </form>
      </Form>
    </Structure>
  );
}
