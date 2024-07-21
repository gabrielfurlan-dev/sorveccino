import { EOrderStatus } from "@/lib/orders/enums/EOrderStatus";
import { Acai } from "@/lib/orders/types/Acai";

export type AddOrderCommand = {
  customerId: string;
  acais: Acai[];
  discountCode?: string;
  total?: number;
  status: EOrderStatus;
};
