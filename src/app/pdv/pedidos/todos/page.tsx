import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { LayoutPedidos } from "./layouts/layoutPedido";

export default function pedidos() {
    return (
        <div className="flex flex-col w-full h-[90vh]">
            <div className="w-full">Navbar</div>
            <ResizablePanelGroup
                direction="horizontal"
                className="w-full rounded-lg border"
            >
                <ResizablePanel>
                    <LayoutPedidos />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel>
                    <Itens />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}

export function Itens() {
    return (
        <div>Itens</div>
    )
}