import { Footer } from "./components/footer";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const orders = [
    { id: 1, nome: "Cliente A", dataHora: "2024-07-21 14:30", valorTotal: "100,00", valorPagar: "50,00" },
    { id: 2, nome: "Cliente B", dataHora: "2024-07-21 15:00", valorTotal: "200,00", valorPagar: "100,00" },
    { id: 3, nome: "Cliente B", dataHora: "2024-07-21 15:00", valorTotal: "200,00", valorPagar: "100,00" },
    { id: 3, nome: "Cliente B", dataHora: "2024-07-21 15:00", valorTotal: "200,00", valorPagar: "100,00" },
    { id: 3, nome: "Cliente B", dataHora: "2024-07-21 15:00", valorTotal: "200,00", valorPagar: "100,00" },
    { id: 3, nome: "Cliente B", dataHora: "2024-07-21 15:00", valorTotal: "200,00", valorPagar: "100,00" },
];

const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

const totalAmount = orders.reduce((acc, order) => acc + parseFloat(order.valorPagar.replace(',', '.')), 0);

export default function Order() {

    return (
        <div className="flex flex-col w-full h-[100vh]">
            <div className="px-20 pt-14">
                <h1>Todos os pedidos</h1>
                <div className="mt-4 max-h-[70vh] overflow-y-auto px-20">
                    <Table>
                        <TableCaption>Lista dos últimos pedidos</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">ID</TableHead>
                                <TableHead>Nome do Cliente</TableHead>
                                <TableHead>Dia/Hora</TableHead>
                                <TableHead className="text-right">Valor Total</TableHead>
                                <TableHead className="text-right">Valor a Ser Pago</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.id}</TableCell>
                                    <TableCell>{order.nome}</TableCell>
                                    <TableCell>{order.dataHora}</TableCell>
                                    <TableCell className="text-right">{order.valorTotal}</TableCell>
                                    <TableCell className="text-right">{order.valorPagar}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <Footer total={formatCurrency(totalAmount)} />
        </div>
    )
}