"use client";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Textarea } from "@/components/ui/textarea";
import { Footer } from "./components/footer";
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
import {
  NewOrderForm,
  NewOrderFormSchema,
} from "@/lib/Backend/Order/Types/Commands/NewOrderForm";

export default function NewOrder() {
  const router = useRouter();

  const form = useForm<NewOrderForm>({
    resolver: zodResolver(NewOrderFormSchema),
    defaultValues: {
      customer: {
        name: "Cliente Padrão",
      },
    },
  });

  async function onSubmit() {
    try {
      const values = form.getValues();
      await addOrder({
        total: values.total,
        totalRecieved: values.totalRecieved,
        customer: {
          name: values.customer.name,
          notes: values.customer.notes,
        },
        description: values.description,
      });
      toast.success("Pedido adicionado com sucesso.");
      router.push("/order/all");
    } catch (error) {
      toast.error("Ocorreu um erro ao adicionar o pedido.");
    }
  }

  async function Add(order: NewOrderForm) {
    await fetch("/api/order/new", {
      method: "POST",
      body: JSON.stringify(order),
    });
  }

  const { mutateAsync: addOrder } = useMutation({
    mutationFn: Add,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

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
          <Footer control={form.control} onSubmit={onSubmit} />
        </form>
      </Form>
    </Structure>
  );
}
