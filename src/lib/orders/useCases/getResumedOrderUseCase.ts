import { iCommandResult } from "@/lib/data/results/iCommandResult";
import { IOrderRepository } from "../interfaces/iOrderRepository";
import { OrderRepository } from "../repositories/orderRepository";

export class GetOrderUseCase {
  private repo: IOrderRepository;

  constructor(repo: IOrderRepository = new OrderRepository()) {
    this.repo = repo;
  }

  public async execute(): Promise<iCommandResult> {
    try {
      const result = await this.repo.getAllResumed();
      return {
        success: true,
        message: "Resumed orders found",
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
