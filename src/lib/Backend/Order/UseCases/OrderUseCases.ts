import { UpdateOrderCommand } from "./../Types/Commands/UpdateOrderCommand";
import { getAllProps, OrderRepository } from "@/lib/Backend/Order/Repository/OrderRepository";
import { IOrderRepository } from "@/lib/Backend/Order/Types/Interfaces/IOrderRepository";
import { NewOrderForm } from "../Types/Commands/NewOrderForm";
import { ICommandResult } from "@/lib/Backend/Data/Interfaces/ICommandResult";

const repo: IOrderRepository = new OrderRepository();

export async function New(order: NewOrderForm): Promise<ICommandResult> {
  try {
    const id = await repo.add(order);
    return { success: true, message: "Order created", data: id };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

export async function Get(id: string): Promise<ICommandResult> {
  try {
    const order = await repo.get(id);
    return { success: true, message: "Order found", data: order };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

export async function Update(order: UpdateOrderCommand): Promise<ICommandResult> {
  try {
    await repo.update(order);
    return { success: true, message: "Order updated" };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

export async function Delete(id: string): Promise<ICommandResult> {
  try {
    await repo.delete(id);
    return { success: true, message: "Order deleted" };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

export async function GetAll({startDate, endDate }: getAllProps): Promise<ICommandResult> {
  try {
    const orders = await repo.getAll({ startDate, endDate });
    return { success: true, message: "Orders found", data: orders };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}
