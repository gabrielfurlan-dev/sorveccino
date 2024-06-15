'use client'
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from "@/components/ui/select";
import { PintGlass, Plus, X } from "@phosphor-icons/react/dist/ssr";
import { Adicional } from "@/lib/pedidos/types/Adicional";
import { ListaAdicionais, ListaEmbalagens } from "@/data/PedidoPentente";
import { useForm, Controller, Control } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { BotaoCategoria } from "./components/BotaoCategoria";

export default function NovoCopo() {
    const form = useForm<PedidoSchema>({
        resolver: zodResolver(pedidoSchema),
        defaultValues: {
            nomeCliente: "Cliente sem nome.",
            embalagem: ListaEmbalagens[0],
        },
    })

    function onSubmit(values: PedidoSchema) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <div className="w-full h-[90vh] flex items-center justify-center">
            <Dialog>
                <DialogTrigger asChild>
                    <div><BotaoCategoria Icon={PintGlass} tooltip="Açaís" /></div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Adicionar copo de açaí</DialogTitle>
                        <DialogDescription>
                            Preencha todos os campos corretamente e clique em salvar.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="nomeCliente"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Gabriel Furlan" {...field} />
                                        </FormControl>
                                        <FormDescription>Nome do Cliente</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="embalagem"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Embalagem</FormLabel>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field.value ? field.value.id : ""}
                                                onValueChange={(id) => { field.onChange(ListaEmbalagens.find(e => e.id === id)); }}
                                            >
                                                <SelectTrigger>{field.value ? field.value.nome : "Selecione"}</SelectTrigger>
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
                                        </FormControl>
                                        <FormDescription>Embalagem do Açaí</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="adicionais"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Adicionais</FormLabel>
                                        <FormControl>
                                            <ComboBoxAdicionaisHookForm control={form.control} />
                                        </FormControl>
                                        <FormDescription>Adicionais do Açaí</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button type="submit">Adicionar</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div >
    );
}

const pedidoSchema = z.object({
    nomeCliente: z.string(),
    embalagem: z.object({
        id: z.string(),
        categoria: z.string(),
        nome: z.string(),
        tamanho: z.number(),
        unidadeMedida: z.string(),
        preco: z.number(),
    }),
    adicionais: z.array(
        z.object({
            id: z.string(),
            nome: z.string(),
            preco: z.number(),
            categoria: z.string(),
        }).nullable()
    ),
})

type PedidoSchema = z.infer<typeof pedidoSchema>

type ComboBoxAdicionaisProps = {
    control: Control<PedidoSchema>
}

export function ComboBoxAdicionaisHookForm({ control }: ComboBoxAdicionaisProps) {
    return (
        <Controller
            name="adicionais"
            control={control}
            defaultValue={[]}
            render={({ field }) => {
                const { onChange, value = [] } = field;

                const nonNullValue = value.filter(item => item !== null) as Adicional[];

                const addItem = (adicional: Adicional) => {
                    if (!nonNullValue.some(item => item.id === adicional.id)) {
                        onChange([...nonNullValue, adicional]);
                    }
                    console.log(field.value)
                };

                const removeItem = (id: string) => {
                    onChange(nonNullValue.filter(item => item.id !== id));
                };

                return (
                    <Popover>
                        <div>
                            {nonNullValue.map((adicional: Adicional) => (
                                <div key={adicional.nome} className="flex flex-row justify-between items-center gap-2">
                                    <div className="w-full dark:text-neutral-500 text-neutral-800 flex flex-row justify-between">
                                        <span>{adicional.nome}</span>
                                        <span>{adicional.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                                    </div>
                                    <span onClick={() => removeItem(adicional.id ?? "")}><X className="dark:text-neutral-500 text-neutral-800 hover:dark:text-red-500" size={18} /></span>
                                </div>
                            ))}
                        </div>
                        <PopoverTrigger asChild>
                            <Button variant="secondary" className="hover:bg-purple-500 py-4">
                                <Plus size={24} />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder="Selecione um Adicional..." />
                                <CommandList>
                                    <CommandEmpty>Nenhum adicional encontrado.</CommandEmpty>
                                    <CommandGroup>
                                        {ListaAdicionais.map((adicional: Adicional) => (
                                            <CommandItem
                                                key={adicional.id}
                                                value={adicional.id}
                                                onSelect={() => addItem(adicional)}
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
            }}
        />
    );
}
