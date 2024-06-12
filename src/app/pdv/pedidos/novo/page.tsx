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

export default function novo() {
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
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                defaultValue="Pedro Duarte"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Username
                            </Label>
                            <Input
                                id="username"
                                defaultValue="@peduarte"
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
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