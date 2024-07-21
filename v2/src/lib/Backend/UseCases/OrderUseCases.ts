import { Order } from "@/lib/Backend/Types/Order";

let orders: Order[] = [];

function Seed() {
  if (orders.length > 0) return;
  orders.push({
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

  orders.push({
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

export async function Get(id: string): Promise<Order | undefined> {
  return orders.find((o) => o.id === id);
}

export async function Add(order: Order): Promise<Order> {
  orders.push(order);
  return order;
}

export async function Edit(order: Order): Promise<Order> {
  orders = orders.map((o) => (o.id === order.id ? order : o));
  return order;
}
export async function Delete(id: string): Promise<void> {
  orders = orders.filter((o) => o.id !== id);
}
export async function GetAll(): Promise<Order[]> {
  Seed();
  return orders;
}
