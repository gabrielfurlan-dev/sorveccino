import { Button } from "@/components/ui/button"
import { Moped } from "@phosphor-icons/react/dist/ssr"

export function Footer() {
    return (
        <div className="flex w-full px-12 items-center py-2 mt-auto fixed bottom-10">
            <Button variant="outline" className="bg-transparent border-neutral-100 hover:bg-purple-900 hover:border-purple-900">
                <Moped size={20} className="mr-2" />
                Entregas
            </Button>
            <div className="flex items-center justify-end w-full gap-x-8">
                <div className="flex flex-col justify-center">
                    <h3 className="text-[12px]">Total Vendido</h3>
                    <h1 className="font-semibold text-[20px]">R$ 22,00</h1>
                </div>
                <Button variant="outline" className="bg-transparent border-neutral-100 text-[13px] hover:bg-purple-900 hover:border-purple-900 w-[160px]">
                    Novo
                </Button>
            </div>
        </div>
    );
}