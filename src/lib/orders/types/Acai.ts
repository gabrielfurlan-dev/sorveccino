import { Aditional } from "./Aditional";
import { Packaging } from "./package";
import { Sale } from "./Promocao";

export interface Acai extends Item {
    embalagem: Packaging,
    aditionals?: Aditional[]
    sale?: Sale,
    notes?: string,
}