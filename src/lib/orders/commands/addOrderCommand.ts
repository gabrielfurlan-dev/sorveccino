import { Adicional } from '@/lib/orders/types/Adicional';
import { Embalagem } from '@/lib/orders/types/Embalagem';

export type AddOrderCommand = {
    customerId: string,
    date: Date,
    acais: AddAcaiCommand[],
    discountCode?: string
}

type AddAcaiCommand = {
    category?: string,
    price: number,
    packaging: Embalagem,
    additionals?: Adicional[]
    saleId?: string,
    onservations?: string,
}