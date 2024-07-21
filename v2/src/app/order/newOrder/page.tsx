import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Textarea } from "@/components/ui/textarea"
import { Footer } from "./components/footer"

export default function NewOrder() {
    return (
        <div className="flex flex-col w-full h-[100vh]">
            <div className="px-20 pt-14 h-[80vh]">
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel>
                        <h1 className="text-xl">Descrição do Pedido</h1>
                        <div className="h-[65vh] border-2 rounded-lg mr-10 mt-6">
                            
                        </div>
                    </ResizablePanel>
                    <ResizableHandle className="invisible"/>
                    <ResizablePanel>
                        <h1 className="text-xl">Dados Pessoais</h1>
                        <div className="py-6 px-2">
                            <div className="flex flex-col gap-y-3">
                                <Label>Nome</Label>
                                <Input />
                            </div>
                            <div className="flex flex-col gap-y-3 mt-6">
                                <Label>Endereço</Label>
                                <Textarea />
                            </div>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
            <Footer />
        </div>
    )
}