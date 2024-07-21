import { NavBar } from "@/components/sorveccino-ui/Navbar"
import { Subtitle } from "./components/subtitle"
import { Footer } from "./components/footer"

export default function Vendas() {
    return (
        <div className="flex flex-col w-full h-[100vh]">
            <NavBar href="Vendas" />
            <Subtitle />
            <Footer />
        </div>
    )
}