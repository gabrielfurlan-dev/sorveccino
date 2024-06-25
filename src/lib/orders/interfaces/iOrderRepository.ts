import { AddOrderCommand } from "../commands/addOrderCommand";

export interface IOrderRepository {
    save(order: AddOrderCommand): Promise<void>
}