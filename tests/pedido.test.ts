import { GetOrderUseCase } from "../src/lib/orders/useCases/GetOrdersUseCase";
import { describe, expect } from "bun:test";
import { AddOrderCommand } from "@/lib/orders/commands/AddOrderCommand";
import { AddOrderUseCase } from "@/lib/orders/useCases/AddOrderUseCase";
import { Order } from "@/lib/orders/types/Order";

describe("INTEGRATION - Should Save Order", async () => {
  const order: AddOrderCommand = {
    customerId: "wo91d9ww31dyyskpbja1cva0",
    acais: [
      {
        sale: null,
        packaging: {
          category: "acai",
          description: "Copo",
          price: 10,
        },
        aditionals: [
          {
            name: "Morango",
            category: "Frutas",
            price: 4,
          },
          {
            name: "Creme de Ninho",
            category: "Cremes",
            price: 4,
          },
        ],
        notes: "",
      },
    ],
    discountCode: "",
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
  const result = await useCase.execute();
  console.log(result.data as Order[]);
  expect(result.success).toBe(true);
});
