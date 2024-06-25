import { Adicional } from "./Adicional";
import { Embalagem } from "./Embalagem";
import { Promocao } from "./Promocao";

export interface Acai extends Item {
    embalagem: Embalagem,
    adicionais?: Adicional[]
    promocao?: Promocao,
    onservacoes?: string,
}