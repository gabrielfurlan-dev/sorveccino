import { iCommandResult } from "@/lib/data/results/iCommandResult";
import { AddOrderCommand } from "../commands/addOrderCommand";
import { IOrderRepository } from "../interfaces/iOrderRepository";
import { OrderRepository } from "../repositories/orderRepository";

export class AddOrderUseCase {
  private repo: IOrderRepository;

  constructor(repo: IOrderRepository = new OrderRepository()) {
    this.repo = repo;
  }

  public async execute(order: AddOrderCommand): Promise<iCommandResult> {
    try {
      const result = await this.repo.save(order);
      return {
        success: true,
        message: "Order created",
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        message: `Unable to create order. ${error}`,
        data: null,
      };
    }
  }
}

