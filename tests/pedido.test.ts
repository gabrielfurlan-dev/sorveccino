import { describe, expect } from "bun:test";
import { AddOrderCommand } from "@/lib/orders/commands/addOrderCommand";
import { AddOrderUseCase } from "@/lib/orders/useCases/addOrderUseCase";

describe("Should Save Order", async () => {
  const order: AddOrderCommand = {
    customerId: "iyzcxpwu6a8yjdrsghwekkes",
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
  const result = await addOrder.execute(order);
  console.log(result);
  expect(result.success).toBe(true);
});
