import { Order } from "@/lib/Backend/Types/Order";

export class OrderUseCases {
  private static orders: Order[] = [];

  public static Seed() {
    if (this.orders.length > 0) return;
    this.orders.push({
      id: "1",
      createdAt: new Date(2024, 7, 21),
      customer: {
        name: "Dona Cecilia",
        notes:
          "Rua calabreso, 1250 - Centro <br>" +
          "Forma de pagamento: Dinheiro <br>" +
          "Troco pra 50 <br>" +
          "https://maps.com/endereco-do-cara",
      },
      description: "Copo de 350 ml com morango e banana",
      total: 16,
      totalToRecieve: 10,
    });

    this.orders.push({
      id: "2",
      createdAt: new Date(2024, 7, 21),
      customer: {
        name: "Cristiano Ronaldo",
        notes:
          "Rua santiago Bernabeu, 333 - Bairro Espanha <br>" +
          "Forma de pagamento: PICSI <br>" +
          "Troco pra 999999 <br>" +
          "https://maps.com/endereco-do-cara",
      },
      description: "A loja toda",
      total: 75000,
      totalToRecieve: 75000,
    });
  }

  public static async Get(id: string): Promise<Order | undefined> {
    return this.orders.find((o) => o.id === id);
  }

  public static async Add(order: Order): Promise<Order> {
    this.orders.push(order);
    return order;
  }

  public static async Edit(order: Order): Promise<Order> {
    this.orders = this.orders.map((o) => (o.id === order.id ? order : o));
    return order;
  }

  public static async Delete(id: string): Promise<void> {
    this.orders = this.orders.filter((o) => o.id !== id);
  }

  public static async GetAll(): Promise<Order[]> {
    this.Seed();
    return this.orders;
  }
}