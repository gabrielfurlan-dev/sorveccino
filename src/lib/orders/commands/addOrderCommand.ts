import { EOrderStatus } from "@/lib/orders/enums/EOrderStatus";
import { Acai } from "@/lib/orders/types/Acai";

export type AddOrderCommand = {
  id: string;
  customerId: string;
  createdAt: Date;
  acais: Acai[];
  discountCode?: string;
  total: number;
  status: EOrderStatus;
};
