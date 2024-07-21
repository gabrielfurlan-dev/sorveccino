import { Order } from '@/lib/orders/types/Order';
import { ResumedOrder } from "@/lib/orders/types/ResumedOrder";
import { addOrderResult } from "@/lib/orders/results/addOrderResult";
import { EOrderStatus } from "@/lib/orders/enums/EOrderStatus";
import { UpdateOrderCommand } from "@/lib/orders/commands/UpdateOrderCommand";
import { AddOrderCommand } from '../commands/AddOrderCommand';

export interface IOrderRepository {
  getDiscount(discountCode?: string): number;
  getAll(): Promise<ResumedOrder[]>;
  getById(orderId: string): Promise<Order>;
  addOrder(command: AddOrderCommand): Promise<addOrderResult>;
  updateOrder(command: UpdateOrderCommand): Promise<void>;
  removeOrder(orderId: string): Promise<void>;
  updateStatus(orderId: string, status: EOrderStatus): Promise<void>;
}
