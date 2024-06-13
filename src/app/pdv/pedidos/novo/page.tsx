'use client'
import { Button } from "@/components/ui/button"
import { Icon } from "@phosphor-icons/react/dist/lib/index";
import { PintGlass } from "@phosphor-icons/react/dist/ssr";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ReactNode, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


const frameworks = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
]


export default function novo() {

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    return (
        <div className="w-full h-[90vh] flex items-center justify-center">
            <Dialog>
                <DialogTrigger asChild>
                    <button>
                        <BotaoCategoria Icon={PintGlass} tooltip="Açais" />
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Adicionar copo de açaí</DialogTitle>
                        <DialogDescription>
                            Preencha todos os campos corretamente e clique em salvar.
                        </DialogDescription>
                    </DialogHeader>

                    <Campo titulo="Nome">
                        <Input
                            id="Nome"
                            defaultValue="Evilin"
                            className="col-span-3"
                        />
                    </Campo>
                    <Campo titulo="Embalagem">
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-[200px] justify-between"
                                >
                                    {value
                                        ? frameworks.find((framework) => framework.value === value)?.label
                                        : "Select framework..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput placeholder="Search framework..." />
                                    <CommandList>
                                        <CommandEmpty>No framework found.</CommandEmpty>
                                        <CommandGroup>
                                            {frameworks.map((framework) => (
                                                <CommandItem
                                                    key={framework.value}
                                                    value={framework.value}
                                                    onSelect={(currentValue) => {
                                                        setValue(currentValue === value ? "" : currentValue)
                                                        setOpen(false)
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            value === framework.value ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {framework.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </Campo>

                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div >
    )
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

type campoProps = {
    titulo: string,
    children: ReactNode
}
export function Campo({ titulo, children }: campoProps) {
    return (
        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={titulo} className="text-right">
                    {titulo}
                </Label>
                {children}
            </div>
        </div>
    )
}