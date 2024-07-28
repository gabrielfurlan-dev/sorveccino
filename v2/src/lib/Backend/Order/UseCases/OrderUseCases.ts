import { Order } from "@/lib/Backend/Order/Types/Entities/Order";
import { OrderRepository } from "@/lib/Backend/Order/Repository/OrderRepository";
import { IOrderRepository } from "@/lib/Backend/Order/Types/Interfaces/IOrderRepository";
import { NewOrderForm } from "../Types/Commands/NewOrderForm";

const repo: IOrderRepository = new OrderRepository();

export async function Get(id: string): Promise<Order> {
  // return repo.get(id);
  return {
    id: "1",
    createdAt: new Date(),
    description: "Teste",
    customer: {
      name: "Teste",
      notes: "Teste",
    },
    total: 100,
    totalToRecieve: 100,
  };
}

export async function New(order: NewOrderForm): Promise<void> {
  return repo.add(order);
}

export async function Update(order: Order): Promise<void> {
  // return repo.update(order);
}
export async function Delete(id: string): Promise<void> {
  // return repo.delete(id);
}
export async function GetAll(): Promise<Order[]> {
  return repo.getAll();
}
