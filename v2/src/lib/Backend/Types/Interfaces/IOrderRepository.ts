import { Order } from "../Order/Order";

export interface IOrderRepository {
    Add(order: Order): Promise<void>,
    get(id: string):  Promise<Order>,
    getAll():  Promise<Order[]>,
    update(order: Order):  Promise<void>,
    delete(id: string):  Promise<void>
}