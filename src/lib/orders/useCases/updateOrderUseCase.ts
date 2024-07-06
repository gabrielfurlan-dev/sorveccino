import { ICommandResult } from '@/lib/data/results/iCommandResult';
import { AddOrderCommand } from '@/lib/orders/commands/addOrderCommand';
import { IOrderRepository } from "@/lib/orders/interfaces/IOrderRepository";
import { OrderRepository } from "@/lib/orders/repositories/orderRepository";

export class UpdateOrderUseCase {
    private repo: IOrderRepository;

    constructor(repo: IOrderRepository = new OrderRepository()) {
        this.repo = repo;
    }

    public async execute(order: AddOrderCommand): Promise<ICommandResult> {
        try {
            const result = await this.repo.updateOrder(order);
            return {
                success: true,
                message: "Order updated",
                data: result,
            };
        } catch (error) {
            return {
                success: false,
                message: `Unable to update order. ${error}`,
                data: null,
            };
        }
    }
}