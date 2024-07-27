import { orders } from "@/db/schemas/order";
import { IOrderRepository } from "../../Types/Interfaces/IOrderRepository";
import { db } from "@/db/connection";
import { eq } from "drizzle-orm";
import { Order } from "@/lib/Backend/Types/Order/Order";

export class OrderRepository implements IOrderRepository {
    async Add(order: Order): Promise<void> {
        await db.insert(orders)
            .values({
                description: order.description,
                customer: order.customer,
                total: order.total.toString(),
                totalToRecieve: order.totalToRecieve.toString()
            })
    }
    async get(id: string): Promise<Order> {
        const data = await db.select({
            id: orders.id,
            description: orders.description,
            total: orders.total,
            createdAt: orders.createdAt,
            totalToRecieve: orders.totalToRecieve,
            customer: orders.customer
        })
            .from(orders)
            .where(eq(orders.id, id))

        const order = data[0];
        const customer = order.customer as any
        return {
            id: order.id,
            createdAt: order.createdAt,
            description: order.description ?? "",
            customer: {
                name: customer.name,
                notes: customer.notes
            },
            total: Number(order.total),
            totalToRecieve: Number(order.totalToRecieve)
        } satisfies Order;
    }
    async getAll(): Promise<Order[]> {
        const data = await db.select({
            id: orders.id,
            description: orders.description,
            total: orders.total,
            createdAt: orders.createdAt,
            totalToRecieve: orders.totalToRecieve,
            customer: orders.customer
        }).from(orders)

        return data.map(order => {
            const customer = order.customer as any
            return {
                id: order.id,
                createdAt: order.createdAt,
                description: order.description ?? "",
                customer: {
                    name: customer.name,
                    notes: customer.notes
                },
                total: Number(order.total),
                totalToRecieve: Number(order.totalToRecieve)
            } satisfies Order;
        })
    }
    async update(order: Order): Promise<void> {
        await db.update(orders).set({
            description: order.description,
            customer: order.customer,
            total: order.total.toString(),
            totalToRecieve: order.totalToRecieve.toString()
        }).where(eq(orders.id, order.id))
    }
    async delete(id: string): Promise<void> {
        await db.delete(orders).where(eq(orders.id, id))
    }
}