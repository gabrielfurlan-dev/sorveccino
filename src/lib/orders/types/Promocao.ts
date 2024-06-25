import { EDaysOfWeek } from "@/lib/date/EDaysOfWeek"

export type Promocao = {
    descontoPorcentagem: number,
    nomePromocao: string,
    diasDaSemana: EDaysOfWeek[]
}