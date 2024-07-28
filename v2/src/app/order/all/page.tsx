"use client";
import { Footer } from "./components/footer";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Structure } from "@/components/sorveccino-ui/structure";
import { toast } from "sonner";
import Link from "next/link";
import { PencilLine, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Order } from "@/lib/Backend/Order/Types/Entities/Order";

export default function AllOrders() {
  async function getAll(): Promise<Order[]> {
    const res = await fetch("/api/order/get-all", { method: "GET" });
    return res.json().then((data) => data.data);
  }

  const [total, setTotal] = useState(0);
  const { data: orders, refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: getAll,
  });

  useEffect(() => {
    if (!orders?.length) return;
    setTotal(
      orders?.reduce((acc, order) => acc + order.totalToRecieve, 0) ?? 0
    );
  }, [orders]);

  const { mutate: deleteOrder } = useMutation({
    // mutationFn: DeleteOrder,
    onSuccess: () => {
      toast.success("Pedido excluído com sucesso.");
      refetch();
    },
    onError: () => {
      toast.error("Erro ao excluir o pedido.");
    },
  });

  const handleDelete = (id: string) => {
    // deleteOrder(id);
  };

  function formatCurrency(value: number) {
    if (typeof value !== "number") {
      return formatCurrency(parseFloat(value));
    }
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  const orderCount = orders?.length ?? 0;

  return (
    <Structure>
      <div className="px-20">
        <h1>Todos os pedidos</h1>
        <div className="mt-4 max-h-[70vh] overflow-y-auto">
          <Table>
            <TableCaption>{`Lista dos últimos pedidos: ${orderCount}`}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">ID</TableHead>
                <TableHead>Nome do Cliente</TableHead>
                <TableHead>Dia/Hora</TableHead>
                <TableHead className="text-start">Valor Total</TableHead>
                <TableHead className="text-start">Valor a Ser Pago</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders &&
                orders.length &&
                orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer.name}</TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-start">
                      {formatCurrency(order.total)}
                    </TableCell>
                    <TableCell className="text-start">
                      {formatCurrency(order.totalToRecieve)}
                    </TableCell>
                    <TableCell className="text-center flex gap-2 justify-center">
                      <Link
                        href={`/order/edit/${order.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <PencilLine />
                      </Link>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDelete(order.id ?? "")}
                      >
                        <Trash2 />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <Footer total={total} />
    </Structure>
  );
}
