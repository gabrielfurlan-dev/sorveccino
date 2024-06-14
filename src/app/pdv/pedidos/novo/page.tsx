'use client'
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Adicional, Embalagem, ListaAdicionais, ListaEmbalagens, obterPedidoEditado as obterPedidoAtual } from "@/data/pedidoEditado";
import { queryClient } from "@/lib/reactQuery";
import { createId } from "@paralleldrive/cuid2";
import { Icon } from "@phosphor-icons/react/dist/lib/index";
import { PintGlass, Plus } from "@phosphor-icons/react/dist/ssr";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface CopoState {
    nome: string;
    embalagem: Embalagem | null;
    adicionais: Adicional[];
}

const copoInitialState: CopoState = {
    nome: "",
    embalagem: null,
    adicionais: [],
};

export default function NovoCopo() {
    const [copo, setCopo] = useState<CopoState>(copoInitialState);
    
    const { data: pedido } = useQuery({
        queryFn: obterPedidoAtual,
        queryKey: ['pedidoAtual'],
    })
    const { mutateAsync: alterarPedidoAtualFn } = useMutation({
        mutationFn: alterarPedidoAtual,
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

    async function alterarPedidoAtual() {
        try {
            // await alterarPedidoAtualFn({
            //     cliente: 'Evylin 2',
            //     data: new Date(),
            //     total: 500
            // })
            toast.success("Pedido adicionado")

        } catch (error) {
            toast.error("Erro ao adicionar pedido")
        }
    }

    const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCopo((prevState) => ({
            ...prevState,
            nome: event.target.value,
        }));
    };

    function handleEmbalagemChange(idEmbalagem: string) {
        const selectedEmbalagem = ListaEmbalagens.find(
            (embalagem) => embalagem.id === idEmbalagem
        );
        setCopo((prevState) => ({
            ...prevState,
            embalagem: selectedEmbalagem || null,
        }));
    };

    function handleAdicionaisChange(idAdicional: string) {
        const selectedAdicional = ListaAdicionais.find(
            (adicional) => adicional.id === idAdicional
        );

        if (selectedAdicional) {
            setCopo((prevState) => ({
                ...prevState,
                adicionais: [...prevState.adicionais, selectedAdicional],
            }));
        }
    };

    function handleAdicionarCopo() {

    };

    return (
        <div className="w-full h-[90vh] flex items-center justify-center">
            <Dialog>
                <DialogTrigger asChild>
                    <div>
                        <BotaoCategoria Icon={PintGlass} tooltip="Açaís" />
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Adicionar copo de açaí</DialogTitle>
                        <DialogDescription>
                            Preencha todos os campos corretamente e clique em salvar.
                        </DialogDescription>
                    </DialogHeader>

                    <Label htmlFor="nome">Nome:</Label>
                    <Input
                        id="nome"
                        type="text"
                        value={copo.nome}
                        onChange={handleNomeChange}
                    />

                    <Label htmlFor="embalagem">Embalagem</Label>
                    <Select onValueChange={(e) => handleEmbalagemChange(e)}>
                        <SelectTrigger>
                            {copo.embalagem ? copo.embalagem.nome : "Selecione"}
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {ListaEmbalagens.map((embalagem) => (
                                    <SelectItem key={embalagem.id} value={embalagem.id ?? ""}>
                                        {embalagem.nome}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Label htmlFor="adicionais">Adicionais</Label>
                    <ComboBoxAdicionais />

                    <DialogFooter>
                        <Button type="submit" onClick={handleAdicionarCopo}>
                            Adicionar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

type BotaoCategoriaProps = {
    Icon: Icon,
    tooltip: string
}

export function BotaoCategoria({ Icon, tooltip }: BotaoCategoriaProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild className="flex w-14 h-14">
                    <Button variant={"secondary"} className="hover:bg-purple-500 py-4">
                        <Icon size={24} />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{tooltip}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export function ComboBoxAdicionais() {
    const [adicionaisSelecionados, setAdicionaisSelecionados] = useState<Adicional[]>([])
    const [open, setOpen] = useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <div>
                {adicionaisSelecionados && adicionaisSelecionados.map((adicional) => (
                    <div key={adicional.nome} className="flex flex-row justify-between">
                        <span>{adicional.nome}</span>
                        <span>{adicional.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                    </div>
                ))}
            </div>
            <PopoverTrigger asChild>
                <Button variant={"secondary"} className="hover:bg-purple-500 py-4">
                    <Plus size={24} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandList>
                        <CommandEmpty>Nenhum adicional encontrado.</CommandEmpty>
                        <CommandGroup>
                            {ListaAdicionais.map((adicional) => (
                                <CommandItem
                                    key={adicional.nome}
                                    value={adicional.nome}
                                    onSelect={(currentValue) => {
                                        const adicional = ListaAdicionais.find((item) => item.nome === currentValue)
                                        if (!adicional) return;
                                        setAdicionaisSelecionados([...adicionaisSelecionados, adicional])
                                        setOpen(false)
                                    }}
                                >
                                    {adicional.nome}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
