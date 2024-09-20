"use client";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Textarea } from "@/components/ui/textarea";
import { Structure } from "@/components/sorveccino-ui/structure";
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
import { OrderItemHud } from "../../components/orderItemHud";
import { Footer } from "../../components/footer";

export default function EditOrder() {
  const [items, setItems] = useState<NewOrderForm["items"]>([]);


  const [total, setTotal] = useState(0);
  const [totalChange, setTotalChange] = useState(0);
  const [actualItem, setActualItem] = useState<{
    name?: string;
    value?: number;
  }>({});

  const router = useRouter();
  const { id } = useParams();

  const orderId = Array.isArray(id) ? id[0] : id;

  const {
    data: orderData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => Get(orderId),
    enabled: !!orderId,
  });
  const [order, setOrder] = useState<UpdateOrderCommand>({
    id: "",
    total: 0,
    totalRecieved: 0,
    customer: {
      name: "",
      notes: "",
    },
    description: "",
    items: [],
    totalChange: 0,
  });

  async function Get(id: string) {
    const res = await fetch(`/api/order/${id}`, { method: "GET" });
    const data = await res.json() as UpdateOrderCommand;
    
    alert("DATA: " + JSON.stringify(data))
    setOrder({
      id: data.id,
      total: data.total,
      totalRecieved: data.totalRecieved,
      customer: {
        name: data.customer.name,
        notes: data.customer.notes,
      },
      description: data.description,
      items: data.items,
      totalChange: data.totalChange,
    });
    alert("ORDER: " + JSON.stringify(order))
    
    return data;
  }

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
      if (!UpdateOrderCommandSchema.safeParse(order) || !order) {
        toast.error(
          "Ocorreu um erro ao atualizar o pedido. Nem todos os campos estão preenchidos."
        );
        return;
      }

      await editOrder({
        id: orderId,
        total: order.total,
        totalRecieved: order.totalRecieved,
        customer: {
          name: order.customer.name,
          notes: order.customer.notes,
        },
        description: order.description,
        items: items,
        totalChange: order.totalChange,
      });
      toast.success("Pedido atualizado com sucesso.");
      router.push("/order/all");
    } catch (error) {
      toast.error("Ocorreu um erro ao atualizar o pedido.");
    }
  }

  function setTotalRecieved(value: number) {
    setOrder({ ...order, totalRecieved: value });
  }

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar o pedido.</p>;

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
                            name: e.target.value ?? "",
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
        change={order.totalChange}
        onSubmit={onSubmit}
        totalRecieved={order.totalRecieved}
        setTotalRecieved={setTotalRecieved}
      />
    </Structure>
  );
}
