import { ICommandResult } from "@/lib/data/results/ICommandResult";
import { AddOrderCommand } from "@/lib/orders/commands/addOrderCommand";
import { OrderRepository } from "@/lib/orders/repositories/orderRepository";
import { IOrderRepository } from "@/lib/orders/interfaces/IOrderRepository";

export class AddOrderUseCase {
  private repo: IOrderRepository;

  constructor(repo: IOrderRepository = new OrderRepository()) {
    this.repo = repo;
  }

  public async execute(order: AddOrderCommand): Promise<ICommandResult> {
    try {
      const discount = this.repo.getDiscount(order.discountCode);
      const total = this.calculateTotal(order, discount);
      const normalizedOrder = { ...order, total };
      const result = await this.repo.addOrder(normalizedOrder);

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

  private calculateTotal(order: AddOrderCommand, discount: number = 0): number {
    let total = 0;
    
    order.acais.forEach((acai) => {
      if (acai.sale) {
        total += acai.sale.price;
      } else {
        const packagingPrice = acai.packaging.price;
        const aditionalsPrice = acai.aditionals?.reduce((acc, aditional) => acc + aditional.preco,0) || 0;
        total += packagingPrice + aditionalsPrice;
      }
    });

    return total;
  }
}
