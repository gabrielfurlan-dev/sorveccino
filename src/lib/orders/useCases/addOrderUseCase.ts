import { AddOrderCommand } from "../commands/addOrderCommand";
import { IOrderRepository } from "../interfaces/iOrderRepository";
import { OrderRepository } from "../repositories/orderRepository";

const repo: IOrderRepository = new OrderRepository(); 

export async function execute(order: AddOrderCommand) {
    await repo.save(order); 
}