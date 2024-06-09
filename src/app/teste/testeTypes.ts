export type adicional = {
    id: string,
    nome: string,
    preco: number
}
export type pedido = {
    tamanhoCopo: number,
    adicionais: adicional[]
}