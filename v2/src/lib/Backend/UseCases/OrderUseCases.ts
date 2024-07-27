import { Order } from "@/lib/Backend/Types/Order/Order";
import { OrderRepository } from "../Repository/Order/OrderRepository";
import { IOrderRepository } from "../Types/Interfaces/IOrderRepository";

const repo: IOrderRepository = new OrderRepository

export async function Get(id: string): Promise<Order> {
  return repo.get(id);
}

export async function Add(order: Order): Promise<void> {
  return repo.Add(order);
}

export async function Update(order: Order): Promise<void> {
  return repo.update(order);
}
export async function Delete(id: string): Promise<void> {
  return repo.delete(id);
}
export async function GetAll(): Promise<Order[]> {
  return repo.getAll();
}