import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Icon } from "@phosphor-icons/react/dist/lib/index"

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
