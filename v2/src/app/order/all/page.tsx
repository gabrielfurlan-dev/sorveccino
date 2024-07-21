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
import { GetAll } from "@/lib/Backend/UseCases/OrderUseCases";
import { useQuery } from "@tanstack/react-query";

export default function Order() {
  const { data: orders } = useQuery({
    queryKey: ["orders"],
    queryFn: GetAll,
  });

  const totalAmount = orders?.reduce(
    (acc, order) => acc + order.totalToRecieve,
    0
  );

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div className="flex flex-col w-full h-[100vh]">
      <div className="px-20 pt-14">
        <h1>Todos os pedidos</h1>
        <div className="mt-4 max-h-[70vh] overflow-y-auto px-20">
          <Table>
            <TableCaption>Lista dos últimos pedidos</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">ID</TableHead>
                <TableHead>Nome do Cliente</TableHead>
                <TableHead>Dia/Hora</TableHead>
                <TableHead className="text-right">Valor Total</TableHead>
                <TableHead className="text-right">Valor a Ser Pago</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders &&
                orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer.name}</TableCell>
                    <TableCell>{order.createdAt.toISOString()}</TableCell>
                    <TableCell className="text-right">{order.total}</TableCell>
                    <TableCell className="text-right">
                      {order.totalToRecieve}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <Footer total={formatCurrency(totalAmount ?? 0)} />
    </div>
  );
}
