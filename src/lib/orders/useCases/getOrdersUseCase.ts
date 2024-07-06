import { ICommandResult } from "@/lib/data/results/iCommandResult";
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
      return {
        success: true,
        message: "Orders found",
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        message: `Unable to find orders. ${error}`,
        data: [],
      };
    }
  }
}

