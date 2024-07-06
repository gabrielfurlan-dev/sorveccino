import { Aditional } from '../types/Aditional';
import { EOrderStatus } from '../types/EOrderStatus';
import { Packaging as Packaging } from '../types/package';

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
    price?: number,
    packaging: Packaging,
    additionals?: Aditional[]
    saleId?: string,
    onservations?: string,
}