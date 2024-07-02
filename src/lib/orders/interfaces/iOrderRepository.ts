import { addOrderResult } from '@/lib/orders/results/addOrderResult';
import { AddOrderCommand } from "@/lib/orders/commands/addOrderCommand";
import { Order } from '@/lib/orders/types/order';

export interface IOrderRepository {
    save(order: AddOrderCommand): Promise<addOrderResult>
    getAll(): Promise<Order[]>
}