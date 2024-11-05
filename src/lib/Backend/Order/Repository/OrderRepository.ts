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

  async add(order: NewOrderForm): Promise<string> {
    const [result] = await db
    .insert(orders)
    .values({
      description: order.description,
      customer: order.customer,
      total: order.total.toString(),
      totalRecieved: order.totalRecieved.toString(),
      items: JSON.stringify(order.items),
    })
    .returning({ id: orders.id});

    return result.id;
  }
  
  async get(id: string): Promise<Order> {
    const [order] = await db
      .select({
        id: orders.id,
        description: orders.description,
        total: orders.total,
        createdAt: orders.createdAt,
        totalRecieved: orders.totalRecieved,
        customer: orders.customer,
        items: orders.items
      })
      .from(orders)
      .where(eq(orders.id, id));

    const customer = order.customer as any;
    return {
      id: order.id,
      createdAt: order.createdAt,
      description: order.description,
      customer: {
        name: customer.name,
        notes: customer.notes,
      },
      items: JSON.parse(order.items as string),
      total: Number(order.total),
      totalRecieved: Number(order.totalRecieved),
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
        totalRecieved: orders.totalRecieved,
        customer: orders.customer,
        items: orders.items
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
        totalRecieved: Number(order.totalRecieved),
        items: JSON.parse(order.items as string),
      } satisfies Order;
    });
  }

  async update(order: UpdateOrderCommand): Promise<Order> {
    const [result] = await db
      .update(orders)
      .set({
        description: order.description,
        customer: order.customer,
        total: order.total.toString(),
        totalRecieved: order.totalRecieved.toString(),
        items: JSON.stringify(order.items)
      })
      .where(eq(orders.id, order.id))
      .returning({
        id: orders.id,
        createdAt: orders.createdAt,
        description: orders.description,
        customer: orders.customer,
        total: orders.total,
        totalRecieved: orders.totalRecieved,
        items: orders.items
      });

    if (!result) {
      throw new Error("Order not found");
    }

    return {
      id: result.id,
      createdAt: result.createdAt,
      description: result.description,
      customer: result.customer as { name: string, notes: string },
      total: Number(result.total),
      totalRecieved: Number(result.totalRecieved),
      items: JSON.parse(result.items as string),
    };
  }
  async delete(id: string): Promise<string> {
    const [result] = await db
    .delete(orders)
    .where(eq(orders.id, id))
    .returning({id: orders.id});

    return result.id;
  }
}
