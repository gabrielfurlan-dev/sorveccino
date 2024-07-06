import { ICommandResult } from '@/lib/data/results/ICommandResult';
import { IOrderRepository } from "@/lib/orders/interfaces/IOrderRepository";
import { OrderRepository } from "@/lib/orders/repositories/orderRepository";
import { UpdateOrderCommand } from '../commands/UpdateOrderCommand';

export class UpdateOrderUseCase {
    private repo: IOrderRepository;

    constructor(repo: IOrderRepository = new OrderRepository()) {
        this.repo = repo;
    }

    public async execute(order: UpdateOrderCommand): Promise<ICommandResult> {
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