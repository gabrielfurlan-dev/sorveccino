import { getAllProps } from "../../Repository/OrderRepository";
import { NewOrderForm } from "../Commands/NewOrderForm";
import { UpdateOrderCommand } from "../Commands/UpdateOrderCommand";
import { Order } from "../Entities/Order";

export interface IOrderRepository {
  add(order: NewOrderForm): Promise<void>;
  get(id: string): Promise<Order>;
  getAll({startDate, endDate}:getAllProps): Promise<Order[]>;
  update(order: UpdateOrderCommand): Promise<void>;
  delete(id: string): Promise<void>;
}
