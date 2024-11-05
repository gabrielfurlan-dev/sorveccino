import { NewOrderForm } from '@/lib/Backend/Order/Types/Commands/NewOrderForm';
import { UpdateOrderCommand } from '@/lib/Backend/Order/Types/Commands/UpdateOrderCommand';
import { New, Delete, Update, Get } from '@/lib/Backend/Order/UseCases/OrderUseCases';
import { describe, expect, test, beforeAll, afterAll } from "bun:test";

describe("INTEGRATION - Operações de Pedido", () => {
  let orderId: string;
  const newOrder: NewOrderForm = {
    customer: {
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

  beforeAll(async () => {
    const createResult = await New(newOrder);
    expect(createResult.success).toBe(true);
    expect(createResult.data).not.toBeEmpty();
    orderId = createResult.data;
  });

  test("Deve criar um novo pedido", async () => {
    const createResult = await New(newOrder);
    expect(createResult.success).toBe(true);
    expect(createResult.data).not.toBeEmpty();
  });

  test("Deve obter um pedido existente", async () => {
    const getResult = await Get(orderId);
    expect(getResult.success).toBe(true);
    expect(getResult.data).not.toBeEmpty();
    expect(getResult.data.description).toBe(newOrder.description);
    expect(getResult.data.customer.name).toBe(newOrder.customer.name);
    expect(getResult.data.customer.notes).toBe(newOrder.customer.notes);
    expect(getResult.data.items).toEqual(newOrder.items);
    expect(getResult.data.total).toBe(newOrder.total);
    expect(getResult.data.totalRecieved).toBe(newOrder.totalRecieved);
  });

  test("Deve atualizar um pedido existente", async () => {
    const updateOrder: UpdateOrderCommand = {
      id: orderId,
      description: "Pedido de João da Silva atualizado",
      customer: {
        name: "João da Silva",
        notes: "Sem Cupuaçu",
      },
      items: [
        {
          name: "Açaí",
          value: 10,
        },
      ],
      total: 10,
      totalRecieved: 20,
    };

    const updateResult = await Update(updateOrder);
    expect(updateResult.success).toBe(true);
    expect(updateResult.data).not.toBeEmpty();
    expect(updateResult.data.description).toBe(updateOrder.description);
    expect(updateResult.data.customer.name).toBe(updateOrder.customer.name);
    expect(updateResult.data.customer.notes).toBe(updateOrder.customer.notes);
    expect(updateResult.data.items).toEqual(updateOrder.items);
    expect(updateResult.data.total).toBe(updateOrder.total);
    expect(updateResult.data.totalRecieved).toBe(updateOrder.totalRecieved);
  });

  afterAll(async () => {
    const deleteResult = await Delete(orderId);
    expect(deleteResult.success).toBe(true);
    expect(deleteResult.data).toBe(orderId);
  });
});