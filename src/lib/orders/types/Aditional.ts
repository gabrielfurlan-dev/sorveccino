
export interface Aditional extends Item { 
    name: string,
    category?: AditionalCategory,
    price: number
}

export type AditionalCategory = 'Cremes' | 'Frutas' | 'Acompanhamentos'