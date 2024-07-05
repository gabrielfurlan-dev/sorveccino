import { addOrderResult } from '@/lib/orders/results/addOrderResult';
import { AddOrderCommand } from "@/lib/orders/commands/addOrderCommand";
import { Order } from '@/lib/orders/types/order';
import { ResumedOrder } from '../types/ResumedOrder';

export interface IOrderRepository {
    save(order: AddOrderCommand): Promise<addOrderResult>
    getAll(): Promise<Order[]>
    getAllResumed(): Promise<ResumedOrder[]>
}