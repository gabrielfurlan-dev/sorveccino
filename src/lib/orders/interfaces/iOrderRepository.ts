import { addOrderResult } from '@/lib/orders/results/addOrderResult';
import { AddOrderCommand } from "@/lib/orders/commands/addOrderCommand";

export interface IOrderRepository {
    save(order: AddOrderCommand): Promise<addOrderResult>
}