import { eq } from "drizzle-orm";
import { db } from "@/db/connection";
import { customers, orders } from "@/db/schemas";
import { addOrderResult } from "@/lib/orders/results/addOrderResult";
import { EOrderStatus } from "@/lib/orders/enums/EOrderStatus";
import { ResumedOrder } from "@/lib/orders/types/ResumedOrder";
import { Acai } from "@/lib/orders/types/Acai";
import { Order } from "@/lib/orders/types/order";
import { IOrderRepository } from "@/lib/orders/interfaces/IOrderRepository";

export class OrderRepository implements IOrderRepository {
  getDiscount(discountCode?: string): number {
    //TODO: IMPLEMENTS
    return 0;
  }

  async getAll(): Promise<ResumedOrder[]> {
    const result = await db
      .select({
        id: orders.id,
        discountCode: orders.discountCode,
        customerId: orders.customerId,
        createdAt: orders.createdAt,
        customerName: customers.name,
        status: orders.status,
        total: orders.total,
      })
      .from(orders)
      .innerJoin(customers, eq(orders.customerId, customers.id))
      .execute();

    const normalizedResult: ResumedOrder[] = result.map((order) => {
      return {
        id: order.id,
        clientName: order.customerId ?? "",
        total: Number(order.total),
        createdAt: order.createdAt,
        clientAddress: "",
        status: order.status as EOrderStatus,
      } satisfies ResumedOrder;
    });

    return normalizedResult;
  }

  async getById(orderId: string): Promise<Order> {
    const result = await db
      .select({
        id: orders.id,
        acais: orders.acais,
        discountCode: orders.discountCode,
        customerId: orders.customerId,
        createdAt: orders.createdAt,
        customerName: customers.name,
        total: orders.total,
        status: orders.status,
      })
      .from(orders)
      .innerJoin(customers, eq(orders.customerId, customers.id))
      .where(eq(orders.id, orderId))
      .limit(1)
      .execute();

    const normalizedResult: Order = {
      id: result[0].id,
      acais: result[0].acais as unknown as Acai[],
      discountCode: result[0].discountCode ?? "",
      customerId: result[0].customerId ?? "",
      createdAt: result[0].createdAt,
      total: Number(result[0].total),
      status: result[0].status as EOrderStatus
    } satisfies Order;

    return normalizedResult;
  }

  async addOrder(command: Order): Promise<addOrderResult> {
    const result = await db
      .insert(orders)
      .values({
        id: command.id,
        acais: command.acais,
        discountCode: command.discountCode,
        customerId: command.customerId,
        createdAt: command.createdAt,
        total: command.total.toString(),
        status: command.status,
      })
      .returning()
      .execute();

    return result[0];
  }

  async updateOrder(command: Order): Promise<void> {
    await db
      .update(orders)
      .set({
        acais: command.acais,
        discountCode: command.discountCode,
        customerId: command.customerId,
        total: command.total.toString(),
        status: command.status,
      })
      .where(eq(orders.id, command.id))
      .returning()
      .execute();
  }

  async deleteOrder(orderId: string): Promise<void> {
    await db
      .delete(orders)
      .where(eq(orders.id, orderId))
      .returning()
      .execute();
  }

  async updateStatus(orderId: string, status: EOrderStatus): Promise<void> {
    await db
      .update(orders)
      .set({ status })
      .where(eq(orders.id, orderId))
      .returning()
      .execute();
  }
}
