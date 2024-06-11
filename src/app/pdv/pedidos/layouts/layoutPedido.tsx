'use client';
import { Button } from "@/components/ui/button";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adicionarPedido, obterPedidos } from "@/data/pedido";
import { Pedido } from "../components/pedido";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner"
import { createId } from '@paralleldrive/cuid2';

export function LayoutPedidos() {
    const queryClient = useQueryClient()
    const { data: pedidos } = useQuery({
        queryFn: obterPedidos,
        queryKey: ['pedidos'],
    })

    const { mutateAsync: adicionarPedidoFn } = useMutation({
        mutationFn: adicionarPedido,
        onSuccess: (_, variables) => {
            queryClient.setQueryData(['pedidos'], (data: any) => {
                return [...data, {
                    id: createId(),
                    cliente: variables.cliente,
                    data: variables.data,
                    total: variables.total
                }]
            })
        },
    })

    async function adicionar() {
        try {
            await adicionarPedidoFn({
                cliente: 'Evylin 2',
                data: new Date(),
                total: 500
            })
            toast.success("Pedido adicionado")

        } catch (error) {
            toast.error("Erro ao adicionar pedido")
        }
    }

    return (
        <div className="flex h-full flex-col justify-between">
            <div className="flex flex-col py-12 pl-12 gap-4">
                <span className="text-3xl font-bold">Pedidos</span>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead ><span>Nome</span></TableHead>
                            <TableHead ><span>Data</span></TableHead>
                            <TableHead ><span>Hora</span></TableHead>
                            <TableHead ><span>Total</span></TableHead>
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
                onClick={() => adicionar()}
            >
                <span>Novo</span>
                <Plus />
            </Button>
        </div>
    )
}