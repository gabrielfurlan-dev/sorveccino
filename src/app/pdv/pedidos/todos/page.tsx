import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { LayoutPedidos } from "./layouts/layoutPedido";
import { NavBar } from "@/components/sorveccino-ui/Navbar";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ["latin"],
    weight: '400',
});

export default function pedidos() {
    return (
        <div className="flex flex-col w-full h-[90vh]">
            <NavBar href="Pedidos" />
            <ResizablePanelGroup style={{ border: 0 }}
                direction="horizontal"
                className="w-full rounded-lg border"
            >
                <ResizablePanel>
                    <LayoutPedidos />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel>
                    <div className="px-2">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink>
                                        <p className={`text-base ${poppins.className}`}>Gabriel Furlan</p>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage className={`text-base ${poppins.className}`}>Itens</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <Itens />
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}

export function Itens() {
    return (
        <ResizablePanel className="border-[1.5px] border-solid rounded-lg mt-4 mr-6">
            <div className="px-12 pt-5">
                <h1 className={`text-3xl font-semibold`}>Itens</h1>
            </div>
            <div></div>
        </ResizablePanel>
    )
}