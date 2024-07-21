import { Fail, ICommandResult, Success } from '@/lib/data/results/ICommandResult';
import { IOrderRepository } from "@/lib/orders/interfaces/IOrderRepository";
import { OrderRepository } from "@/lib/orders/repositories/OrderRepository";
import { UpdateOrderCommand } from '@/lib/orders/commands/UpdateOrderCommand';

export class UpdateOrderUseCase {
    private repo: IOrderRepository;

    constructor(repo: IOrderRepository = new OrderRepository()) {
        this.repo = repo;
    }

    public async execute(order: UpdateOrderCommand): Promise<ICommandResult> {
        try {
            const result = await this.repo.updateOrder(order);
            return Success("Order updated", result);
        } catch (error) {
            return Fail(`Unable to update order. ${error}`, null) 
        }
    }
}