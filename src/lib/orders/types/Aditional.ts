
export interface Aditional extends Item { 
    nome: string,
    categoria?: CategoriaAdicional,
    preco: number
}

export type CategoriaAdicional = 'Cremes' | 'Frutas' | 'Acompanhamentos'