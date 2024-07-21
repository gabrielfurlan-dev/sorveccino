import { Order } from '@/lib/Backend/Types/Order';

let Orders: Order[] = [];

export function Add(order: Order) {
  Orders.push(order);
  return order;
}

export function Edit(order: Order) {
  Orders = Orders.map((o) => (o.id === order.id ? order : o));
  return order;
}

export function Delete(id: string) {
  Orders = Orders.filter((o) => o.id !== id);
}

export function GetAll() {
  return Orders;
}
