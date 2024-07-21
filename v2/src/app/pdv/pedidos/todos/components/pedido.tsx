import { TableCell, TableRow } from "@/components/ui/table"

export type pedidoProps = {
    id?: number
    cliente: string
    data: Date
    total: number
}

export function Pedido({ id, cliente, data, total }: pedidoProps) {
    return (
        <TableRow>
            <TableCell >{cliente}</TableCell >
            <TableCell >{data.toLocaleDateString()}</TableCell >
            <TableCell >{data.toLocaleTimeString()}</TableCell >
            <TableCell >R$ {total.toFixed(2)}</TableCell >
        </TableRow>
    )
}