import { db } from "@/db/connection";
import { orders } from "@/db/schemas/order";
import { Order } from "@/lib/Backend/Order/Types/Entities/Order";

import { between, eq } from "drizzle-orm";
import { IOrderRepository } from "@/lib/Backend/Order/Types/Interfaces/IOrderRepository";
import { NewOrderForm } from "../Types/Commands/NewOrderForm";
import { UpdateOrderCommand } from "../Types/Commands/UpdateOrderCommand";

export type getAllProps = {
  startDate: Date;
  endDate: Date;
};

export class OrderRepository implements IOrderRepository {
  async add(order: NewOrderForm): Promise<void> {
    await db.insert(orders).values({
      description: order.description,
      customer: order.customer,
      total: order.total.toString(),
      totalToRecieve: (order.total - (order.totalRecieved ?? 0)).toString(),
      items: JSON.stringify(order.items),
    });
  }
  async get(id: string): Promise<Order> {
    const data = await db
      .select({
        id: orders.id,
        description: orders.description,
        total: orders.total,
        createdAt: orders.createdAt,
        totalToRecieve: orders.totalToRecieve,
        customer: orders.customer,
      })
      .from(orders)
      .where(eq(orders.id, id));

    const order = data[0];
    const customer = order.customer as any;
    return {
      id: order.id,
      createdAt: order.createdAt,
      description: order.description ?? "",
      customer: {
        name: customer.name,
        notes: customer.notes,
      },
      total: Number(order.total),
      totalToRecieve: Number(order.totalToRecieve),
    } satisfies Order;
  }

  async getAll({ startDate, endDate }: getAllProps): Promise<Order[]> {
    console.log("START DATE: ", startDate);
    console.log("END DATE: ", endDate);

    const data = await db
      .select({
        id: orders.id,
        description: orders.description,
        total: orders.total,
        createdAt: orders.createdAt,
        totalToRecieve: orders.totalToRecieve,
        customer: orders.customer,
      })
      .from(orders)
      .where(between(orders.createdAt, startDate, endDate));
    
      console.log("DATA: ", data);
    
      return data.map((order) => {
      return {
        id: order.id,
        createdAt: order.createdAt,
        description: order.description ?? "",
        customer: {
          name:
            (order.customer as unknown as { name?: string; notes?: string })
              ?.name ?? "",
          notes:
            (order.customer as unknown as { name?: string; notes?: string })
              ?.notes ?? "",
        },
        total: Number(order.total),
        totalToRecieve: Number(order.totalToRecieve),
      } satisfies Order;
    });
  }

  async update(order: UpdateOrderCommand): Promise<void> {
    await db
      .update(orders)
      .set({
        description: order.description,
        customer: order.customer,
        total: order.total.toString(),
        totalToRecieve: order.totalToRecieve.toString(),
      })
      .where(eq(orders.id, order.id ?? ""));
  }
  async delete(id: string): Promise<void> {
    await db.delete(orders).where(eq(orders.id, id));
  }
}
