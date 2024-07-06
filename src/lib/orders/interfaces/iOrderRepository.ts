import { Order } from "@/lib/orders/types/order";
import { ResumedOrder } from "@/lib/orders/types/ResumedOrder";
import { addOrderResult } from "@/lib/orders/results/addOrderResult";
import { EOrderStatus } from "@/lib/orders/enums/EOrderStatus";

export interface IOrderRepository {
  getDiscount(discountCode?: string): number;
  getAll(): Promise<ResumedOrder[]>;
  getById(orderId: string): Promise<Order>;
  addOrder(command: Order): Promise<addOrderResult>;
  updateOrder(command: Order): Promise<void>;
  deleteOrder(orderId: string): Promise<void>;
  updateStatus(orderId: string, status: EOrderStatus): Promise<void>;
}
