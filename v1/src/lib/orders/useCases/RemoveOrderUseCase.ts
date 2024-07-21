import { Fail, ICommandResult, Success } from '@/lib/data/results/ICommandResult';
import { IOrderRepository } from "@/lib/orders/interfaces/IOrderRepository";
import { OrderRepository } from "@/lib/orders/repositories/OrderRepository";
import { UpdateOrderCommand } from '@/lib/orders/commands/UpdateOrderCommand';

export class RemoveOrderUseCase {
    private repo: IOrderRepository;

    constructor(repo: IOrderRepository = new OrderRepository()) {
        this.repo = repo;
    }

    public async execute(orderId: string): Promise<ICommandResult> {
        try {
            const result = await this.repo.removeOrder(orderId);
            return Success("Order removed", result);
        } catch (error) {
            return Fail(`Unable to remove order. ${error}`, null) 
        }
    }
}