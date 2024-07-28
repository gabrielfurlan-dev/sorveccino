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
import { z } from "zod";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
// import { Get, Update as updateOrder } from "@/lib/Backend/UseCases/OrderUseCases";
import { queryClient } from "@/lib/utils/reactQuery";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export const EditOrderFormSchema = z.object({
  id: z.string().nullable(),
  createdAt: z.date(),
  description: z.string(),
  total: z.coerce.number(),
  totalToRecieve: z.coerce.number(),
  customer: z.object({
    name: z.string(),
    notes: z.string(),
  }),
});

export type EditOrderForm = z.infer<typeof EditOrderFormSchema>;

export default function EditOrder() {
  const router = useRouter();
  const { id } = useParams();

  const orderId = Array.isArray(id) ? id[0] : id;

  const { data: order, isLoading, isError } = useQuery({
    queryKey: ["order", orderId],
    // queryFn: () => Get(orderId),
    enabled: !!orderId,
  });

  const form = useForm<EditOrderForm>({
    resolver: zodResolver(EditOrderFormSchema),
    // defaultValues: {
    //   id: order?.id ?? null,
    //   createdAt: order?.createdAt ?? new Date(),
    //   description: order?.description ?? "",
    //   total: order?.total ?? 0,
    //   totalToRecieve: order?.totalToRecieve ?? 0,
    //   customer: {
    //     name: order?.customer.name ?? "Cliente Padrão",
    //     notes: order?.customer.notes ?? "",
    //   },
    // },
  });

  useEffect(() => {
    console.log(form)
    if (order) {
      // form.reset({
      //   id: order.id ?? null,
      //   createdAt: order.createdAt ?? new Date(),
      //   description: order.description ?? "",
      //   total: order.total ?? 0,
      //   totalToRecieve: order.totalToRecieve ?? 0,
      //   customer: {
      //     name: order.customer.name ?? "Cliente Padrão",
      //     notes: order.customer.notes ?? "",
      //   },
      // });
    }
  }, [order, form]);

  const { mutateAsync: editOrder } = useMutation({
    // mutationFn: updateOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  async function onSubmit() {
    try {
      const values = form.getValues();
      // await editOrder({
      //   id: orderId,
      //   total: values.total,
      //   createdAt: values.createdAt,
      //   totalToRecieve: values.totalToRecieve,
      //   customer: {
      //     name: values.customer.name,
      //     notes: values.customer.notes,
      //   },
      //   description: values.description,
      // });
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
                          className="min-h-[65vh]"
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
          <EditFooter control={form.control} onSubmit={onSubmit} />
        </form>
      </Form>
    </Structure>
  );
}