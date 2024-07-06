import { GetOrderUseCase } from './../src/lib/orders/useCases/getOrdersUseCase';
import { describe, expect } from "bun:test";
import { AddOrderCommand } from "@/lib/orders/commands/addOrderCommand";
import { AddOrderUseCase } from "@/lib/orders/useCases/addOrderUseCase";

describe("INTEGRATION - Should Save Order", async () => {
  const order: AddOrderCommand = {
    customerId: "iyzcxpwu6a8yjdrsghwekkes",
    date: new Date(),
    acais: [
      {
        packaging: {
          id: "1",
          categoria: "acai",
          nome: "Copo",
          tamanho: '330ml',
          preco: 10,
        },
        additionals: [
          {
            nome: "Morango",
            categoria: "Frutas",
            preco: 4,
          },
          {
            nome: "Creme de Ninho",
            categoria: "Cremes",
            preco: 4,
          },
        ],
        onservations: "",
        category: "acai",
      },
    ],
    total: 18,
    status: "pending",
  };

  const addOrder = new AddOrderUseCase();
  const result = await addOrder.execute(order);
  console.log(result);
  expect(result.success).toBe(true);
});

describe("INTEGRATION - Should get orders", async () => {
  const useCase = new GetOrderUseCase();
  // const result = (await useCase.execute()).data as Order[];
  // console.log(result);
  // console.log(result[0].acais);
  // expect(result.success).toBe(true);
})