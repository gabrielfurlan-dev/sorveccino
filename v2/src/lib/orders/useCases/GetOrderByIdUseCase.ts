import { Fail, ICommandResult, Success } from "@/lib/data/results/ICommandResult";
import { IOrderRepository } from "@/lib/orders/interfaces/IOrderRepository";
import { OrderRepository } from "@/lib/orders/repositories/OrderRepository";

export class GetOrderByIdUseCase {
  private repo: IOrderRepository;

  constructor(repo: IOrderRepository = new OrderRepository()) {
    this.repo = repo;
  }

  public async execute(orderId: string): Promise<ICommandResult> {
    try {
      const result = await this.repo.getById(orderId);
      return Success("Order found", result);
    } catch (error) {
      return Fail(`Unable to find order. ${error}`, [])
    }
  }
}
