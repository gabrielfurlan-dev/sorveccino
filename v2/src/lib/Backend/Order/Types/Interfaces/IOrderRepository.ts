import { NewOrderForm } from "../Commands/NewOrderForm";
import { Order } from "../Entities/Order";

export interface IOrderRepository {
    add(order: NewOrderForm): Promise<void>,
    get(id: string):  Promise<Order>,
    getAll():  Promise<Order[]>,
    update(order: Order):  Promise<void>,
    delete(id: string):  Promise<void>
}