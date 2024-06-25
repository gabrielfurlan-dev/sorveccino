import { db } from "@/db/connection";
import { AddOrderCommand } from "@/lib/orders/commands/addOrderCommand";
import { IOrderRepository } from "@/lib/orders/interfaces/iOrderRepository";
import { orders } from "@/db/schemas";
import { addOrderResult } from "@/lib/orders/results/addOrderResult";

export class OrderRepository implements IOrderRepository {
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
        customerId: orders.customerId
      })
      .execute();

    return result[0];
  }
}
