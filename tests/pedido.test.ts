import { NewOrderForm } from '@/lib/Backend/Order/Types/Commands/NewOrderForm';
import { New } from '@/lib/Backend/Order/UseCases/OrderUseCases';
import { describe, expect } from "bun:test";

describe("INTEGRATION - Should add Order", async () => {
  const order: NewOrderForm = {
    customer: 
    {
        name: "João da Silva",
        notes: "Sem cebola",
    },
    items: [
      {
        name: "Açaí",
        value: 10,
      },
    ],
    total: 10,
    totalRecieved: 20,
    description: "Pedido de João da Silva",
  };

  const result = await New(order);
  expect(result.success).toBe(true);
  expect(result.data).not.toBeEmpty();
});

// describe("INTEGRATION - Should get orders", async () => {
//   // const useCase = new GetOrdersUseCase();
//   // const result = await useCase.execute();
//   // console.log(result.data as Order[]);
//   // expect(result.success).toBe(true);
// });

// describe("INTEGRATION - Should get order by id", async () => {
//   // const useCase = new GetOrderByIdUseCase();
//   // const result = await useCase.execute("qzg0quwl6ko6vabsqlpymgjw");
//   // console.log(result.data as Order);
//   // expect(result.success).toBe(true);
// })

// describe("INTEGRATION - Should update order status", async () => {
//   // const useCase = new UpdateStatusOrderUseCase();
//   // const result = await useCase.execute("qzg0quwl6ko6vabsqlpymgjw", "completed");
//   // console.log(result.message);
//   // expect(result.success).toBe(true);
// })

// describe("INTEGRATION - Should remove order", async () => {
//   // const useCase = new RemoveOrderUseCase();
//   // const result = await useCase.execute("m1x16ihkqcvs3igviraoa569");
//   // console.log(result.message);
//   // expect(result.success).toBe(true);
// })