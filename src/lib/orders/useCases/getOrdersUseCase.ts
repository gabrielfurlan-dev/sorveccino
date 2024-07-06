import { Fail, ICommandResult, Success } from "@/lib/data/results/ICommandResult";
import { IOrderRepository } from "@/lib/orders/interfaces/IOrderRepository";
import { OrderRepository } from "@/lib/orders/repositories/orderRepository";

export class GetOrderUseCase {
  private repo: IOrderRepository;

  constructor(repo: IOrderRepository = new OrderRepository()) {
    this.repo = repo;
  }

  public async execute(): Promise<ICommandResult> {
    try {
      const result = await this.repo.getAll();
      return Success("Orders found", result);
    } catch (error) {
      return Fail(`Unable to find orders. ${error}`, [])
    }
  }
}
