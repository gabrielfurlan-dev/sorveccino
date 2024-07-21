import { EOrderStatus } from './../enums/EOrderStatus';
import { Fail, ICommandResult, Success } from '@/lib/data/results/ICommandResult';
import { IOrderRepository } from "@/lib/orders/interfaces/IOrderRepository";
import { OrderRepository } from "@/lib/orders/repositories/OrderRepository";

export class UpdateStatusOrderUseCase {
    private repo: IOrderRepository;

    constructor(repo: IOrderRepository = new OrderRepository()) {
        this.repo = repo;
    }

    public async execute(orderId: string, status: EOrderStatus): Promise<ICommandResult> {
        try {
            await this.repo.updateStatus(orderId, status);
            return Success("Status order updated", null);
        } catch (error) {
            return Fail(`Unable to update status order. ${error}`, null)
        }
    }
}