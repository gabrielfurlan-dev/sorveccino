"use client";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Textarea } from "@/components/ui/textarea";
import { EditFooter } from "../components/footer";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/utils/reactQuery";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  UpdateOrderCommand,
  UpdateOrderCommandSchema,
} from "@/lib/Backend/Order/Types/Commands/UpdateOrderCommand";
import { NewOrderForm } from "@/lib/Backend/Order/Types/Commands/NewOrderForm";

export default function EditOrder() {
  const [items, setItems] = useState<NewOrderForm["items"]>([]);
  const [actualItem, setActualItem] = useState<{
    name?: string;
    value?: number;
  }>({});
  const router = useRouter();
  const { id } = useParams();

  const orderId = Array.isArray(id) ? id[0] : id;

  const {
    data: order,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => Get(orderId),
    enabled: !!orderId,
  });

  async function Get(id: string) {
    const res = await fetch(`/api/order/${id}`, { method: "GET" });
    return res.json().then((data) => data.data);
  }

  const form = useForm<UpdateOrderCommand>({
    resolver: zodResolver(UpdateOrderCommandSchema),
    defaultValues: {
      id: order?.id ?? null,
      description: order?.description ?? "",
      total: order?.total ?? 0,
      totalToRecieve: order?.totalToRecieve ?? 0,
      customer: {
        name: order?.customer.name ?? "Cliente Padrão",
        notes: order?.customer.notes ?? "",
      },
    },
  });

  useEffect(() => {
    if (order) {
      form.reset({
        id: order.id ?? null,
        description: order.description ?? "",
        total: order.total ?? 0,
        totalToRecieve: order.totalToRecieve ?? 0,
        customer: {
          name: order.customer.name ?? "Cliente Padrão",
          notes: order.customer.notes ?? "",
        },
      });
    }
    setItems(order?.items ?? []);
  }, [order, form]);

  const { mutateAsync: editOrder } = useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  async function updateOrder(data: UpdateOrderCommand) {
    await fetch("/api/order/update", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async function onSubmit() {
    try {
      const values = form.getValues();
      await editOrder({
        id: orderId,
        total: values.total,
        totalToRecieve: values.totalToRecieve,
        customer: {
          name: values.customer.name,
          notes: values.customer.notes,
        },
        description: values.description,
        items: items,
      });
      toast.success("Pedido atualizado com sucesso.");
      router.push("/order/all");
    } catch (error) {
      toast.error("Ocorreu um erro ao atualizar o pedido.");
    }
  }

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar o pedido.</p>;

  return (
    <Structure>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="px-20 h-[80vh]">
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição do Pedido</FormLabel>
                      <FormControl>
                        <Textarea
                          className="min-h-[65vh] resize-none"
                          placeholder="Adicione os produtos do seu pedido"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </ResizablePanel>
              <ResizableHandle className="invisible" />
              <ResizablePanel>
                <h1 className="text-xl">Dados Pessoais</h1>
                <div className="py-6 px-2">
                  <FormField
                    control={form.control}
                    name="customer.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Cliente</FormLabel>
                        <FormControl>
                          <Input placeholder="Cliente Padrão" {...field} />
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
          <EditFooter
            control={form.control}
            onSubmit={onSubmit}
            formWatch={form.watch}
          />
        </form>
      </Form>
    </Structure>
  );
}
