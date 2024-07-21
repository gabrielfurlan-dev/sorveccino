import { Fail, ICommandResult, Success } from "@/lib/data/results/ICommandResult";
import { AddOrderCommand } from "@/lib/orders/commands/AddOrderCommand";
import { OrderRepository } from "@/lib/orders/repositories/orderRepository";
import { IOrderRepository } from "@/lib/orders/interfaces/IOrderRepository";
import { Order } from "@/lib/orders/types/Order";
import { Aditional } from "@/lib/orders/types/Aditional";

export class AddOrderUseCase {
  private repo: IOrderRepository;

  constructor(repo: IOrderRepository = new OrderRepository()) {
    this.repo = repo;
  }

  public async execute(order: AddOrderCommand): Promise<ICommandResult> {
    try {
      const discount = this.repo.getDiscount(order.discountCode);
      order.total = this.calculateTotal(order, discount);
      const result = await this.repo.addOrder(order);
      return Success("Order created", result);
    } catch (error) {
      return Fail(`Unable to create order. ${error}`, null);
    }
  }

  private calculateTotal(order: AddOrderCommand, discount: number = 0): number {
    let total = 0;

    order.acais.forEach((acai) => {
      if (acai.sale) {
        total += acai.sale.price;
      } else {
        const aditionalsPrice = this.calculateAditionalsPrice(acai.aditionals ?? []);
        total += acai.packaging.price + aditionalsPrice;
      }
    });

    return total - discount;
  }

  private calculateAditionalsPrice(aditionals: Aditional[]): number {
    return aditionals?.reduce((acc, aditional) => acc + aditional.price, 0) || 0
  }
}
