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
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/utils/reactQuery";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  NewOrderForm,
  NewOrderFormSchema,
} from "@/lib/Backend/Order/Types/Commands/NewOrderForm";
import { OrderItemHud } from "../components/orderItemHud";

export default function NewOrder() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState<NewOrderForm>({
    total: 0,
    totalRecieved: 0,
    customer: {
      name: "",
      notes: "",
    },
    description: "",
    troco: 0,
    items: []
  });
  const [items, setItems] = useState<NewOrderForm["items"]>([]);
  
  useEffect(() => {
    setOrder({
      ...order,
      items: items,
      total: items.reduce((a, b) => a + b.value, 0),
    });
  }, [items]);

  useEffect(() => {
    setOrder({ ...order,  totalRecieved: order.totalRecieved });
  }, [order.totalRecieved]);

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

  function setTotalRecieved(value: number) {
    setOrder({ ...order, totalRecieved: value });
  }

  async function onSubmit() {
    
    if (isLoading) return; 
    
    setIsLoading(true);
    
    if (!NewOrderFormSchema.safeParse(order)) {
      toast.error("Ocorreu um erro ao adicionar o pedido. Nem todos os campos estão preenchidos.");
      setIsLoading(false);
      return;
    }

    try {
      if (!NewOrderFormSchema.parse(order)) return;

      await addOrder({
        total: order.total,
        totalRecieved: order.totalRecieved,
        customer: {
          name: order.customer.name,
          notes: order.customer.notes,
        },
        description: order.description,
        troco: order.troco,
        items: order.items
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
      <div className="px-20 h-[80vh]">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel className="">
            <div>
              <div>
                <p className="text-xl">Descrição do Pedido</p>
                <div className="px-2">
                  <div>
                    <Textarea
                      className=""
                      placeholder="Adicione os produtos do seu pedido"
                      onChange={(e) => {
                        setOrder({ ...order, description: e.target.value });
                      }}
                      value={order.description ?? ""}
                    />
                  </div>
                  <div />
                </div>
              </div>
            </div>
            <OrderItemHud items={items} setItems={setItems} />
          </ResizablePanel>
          <ResizableHandle className="invisible" />
          <ResizablePanel>
            <p className="text-xl">Dados Pessoais</p>
            <div className="py-6 px-2">
              <div>
                <div>
                  <p>Nome do Cliente</p>
                  <div>
                    <Input
                      placeholder="Cliente Padrão"
                      onChange={(e) => {
                        setOrder({
                          ...order,
                          customer: {
                            ...order.customer,
                            name: e.target.value,
                          },
                        });
                      }}
                      value={order.customer.name ?? ""}
                    />
                  </div>
                  <div />
                </div>
              </div>
              <div>
                <div>
                  <p>Observações</p>
                  <div>
                    <Textarea
                      placeholder="Adicione o endereço do cliente e a forma de pagamento"
                      onChange={(e) => {
                        setOrder({
                          ...order,
                          customer: {
                            ...order.customer,
                            notes: e.target.value,
                          },
                        });
                      }}
                      value={order.customer.notes ?? ""}
                    />
                  </div>
                  <div />
                </div>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <Footer
        total={order.total}
        change={order.total - order.totalRecieved}
        onSubmit={onSubmit}
        totalRecieved={order.totalRecieved}
        setTotalRecieved={setTotalRecieved}
      />
    </Structure>
  );
}
