'use client';
import { Button } from "@/components/ui/button";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { obterPedidos } from "@/data/pedido";
import { Pedido } from "../components/pedido";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";

export function LayoutPedidos() {
    const router = useRouter()
    //parei aqui tentando buscar os dados do pedido atual pelo react query
    const queryClient = useQueryClient()
    const { data: pedidos } = useQuery({
        queryFn: obterPedidos,
        queryKey: ['pedidos'],
    })

    return (
        <div className="flex h-full flex-col justify-between">
            <div className="flex flex-col pt-6 pb-12 pl-12 gap-4">
                <span className="text-3xl font-bold">Pedidos</span>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead><span>Nome</span></TableHead>
                            <TableHead><span>Data</span></TableHead>
                            <TableHead><span>Hora</span></TableHead>
                            <TableHead><span>Total</span></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pedidos && pedidos.map((x) => (
                            <Pedido cliente={x.cliente} data={x.data} total={x.total} />
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Button
                className="mx-12 my-10 flex gap-2"
                onClick={() => router.push('/pdv/pedidos/novo')}
            >
                <span>Novo</span>
                <Plus />
            </Button>
        </div>
    )
}