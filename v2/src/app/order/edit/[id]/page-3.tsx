"use client";
import {
  UpdateOrderCommand,
  UpdateOrderCommandSchema,
} from "@/lib/Backend/Order/Types/Commands/UpdateOrderCommand";
import { useParams } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function EditOrder() {
  const defaultValue: UpdateOrderCommand = {
    id: "",
    total: 0,
    totalToRecieve: 0,
    customer: {
      name: "",
      notes: "",
    },
    description: "",
    items: [],
    totalChange: 0,
  };
  const [order, setOrder] = useState<UpdateOrderCommand>(defaultValue);
  const [orderItems, setOrderItems] = useState<UpdateOrderCommand["items"]>([]);
  const [totalChange, setTotalChange] = useState(0);

  const { id } = useParams();
  const orderId = Array.isArray(id) ? id[0] : id;

  useEffect(() => {
    if (!orderId) return;
    fetch(`/api/order/${orderId}`)
      .then((res) => res.json())
      .then((data) => {
        setOrder(data.data);
        // setOrderItems(data.items);
        // setTotalChange(order.totalToRecieve);
      });
  }, [orderId]);

  return (
    <div>
      <h1>Editar pedido</h1>
      {order.id == "" ? (
        <p>Carregando...</p>
      ) : (
        <div>
          <div>{JSON.stringify(order, null, 2)}</div>
          Itens:
          {/* <div>{JSON.stringify(orderItems, null, 2)}</div> */}
          Totais:
          <div>
            {order.total}
            {order.totalToRecieve}
          </div>
        </div>
      )}
    </div>
  );
}
