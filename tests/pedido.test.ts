import { GetOrderUseCase } from './../src/lib/orders/useCases/getOrdersUseCase';
import { describe, expect } from "bun:test";
import { AddOrderCommand } from "@/lib/orders/commands/addOrderCommand";
import { AddOrderUseCase } from "@/lib/orders/useCases/addOrderUseCase";
import { Order } from '@/lib/orders/types/Order';

describe("INTEGRATION - Should Save Order", async () => {
  const order: AddOrderCommand = {
    customerId: "aec7qzf31anace9hi16j4bp7",
    date: new Date(),
    acais: [
      {
        price: 5,
        packaging: {
          id: "1",
          categoria: "acai",
          nome: "Copo 330ml",
          unidadeMedida: "ml",
          tamanho: 330,
          preco: 10,
        },
        additionals: [
          {
            id: "1",
            nome: "Morango",
            categoria: "Frutas",
            preco: 4,
          },
          {
            id: "2",
            nome: "Creme de Ninho",
            categoria: "Cremes",
            preco: 4,
          },
        ],
        onservations: "",
        category: "acai",
      },
    ],
  };

  const addOrder = new AddOrderUseCase();
  // const result = await addOrder.execute(order);
  // console.log(result);
  // expect(result.success).toBe(true);
});

describe("INTEGRATION - Should get orders", async () => {
  const useCase = new GetOrderUseCase();
  // const result = (await useCase.execute()).data as Order[];
  // console.log(result);
  // console.log(result[0].acais);
  // expect(result.success).toBe(true);
})