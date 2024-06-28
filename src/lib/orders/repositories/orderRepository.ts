import { db } from "@/db/connection";
import { AddOrderCommand } from "@/lib/orders/commands/addOrderCommand";
import { IOrderRepository } from "@/lib/orders/interfaces/iOrderRepository";
import { customers, orders } from "@/db/schemas";
import { addOrderResult } from "@/lib/orders/results/addOrderResult";
import { Order } from "../types/Order";
import { eq } from "drizzle-orm";
import { Acai } from "../types/Acai";

export class OrderRepository implements IOrderRepository {
  async getAll(): Promise<Order[]> {
    const result = await db
      .select({
        id: orders.id,
        acais: orders.acais,
        discountCode: orders.discountCode,
        customerId: orders.customerId,
        createdAt: orders.createdAt,
        customerName: customers.name,
      })
      .from(orders)
      .innerJoin(customers, eq(orders.customerId, customers.id))
      .execute();

    const normalizedResult: Order[] = result.map((order) => {
      return {
        id: order.id,
        acais: order.acais as unknown as Acai[],
        discountCode: order.discountCode ?? "",
        customerName: order.customerId ?? "",
        createdAt: order.createdAt,
      } satisfies Order;
    });

    return normalizedResult;
  }
  async save(order: AddOrderCommand): Promise<addOrderResult> {
    const result = await db
      .insert(orders)
      .values({
        customerId: order.customerId,
        acais: order.acais,
        discountCode: order.discountCode,
      })
      .returning({
        id: orders.id,
        createdAt: orders.createdAt,
        updatedAt: orders.updatedAt,
        acais: orders.acais,
        discountCode: orders.discountCode,
        customerId: orders.customerId,
      })
      .execute();

    return result[0];
  }
}
