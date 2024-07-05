import { Adicional } from '@/lib/orders/types/Adicional';
import { Embalagem } from '@/lib/orders/types/Embalagem';
import { EOrderStatus } from '../types/EOrderStatus';

export type AddOrderCommand = {
    customerId: string,
    date: Date,
    acais: AddAcaiCommand[],
    discountCode?: string,
    status: EOrderStatus,
    total?: number,
}

type AddAcaiCommand = {
    category?: string,
    price: number,
    packaging: Embalagem,
    additionals?: Adicional[]
    saleId?: string,
    onservations?: string,
}