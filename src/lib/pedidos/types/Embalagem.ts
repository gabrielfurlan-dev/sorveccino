import { UnidadeMedida } from "./UnidadeMedida";

export interface Embalagem extends Item {
    nome: string,
    categoria: string,
    tamanho: number,
    unidadeMedida: UnidadeMedida
}