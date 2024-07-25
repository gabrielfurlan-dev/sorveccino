import { Nanum_Pen_Script } from "next/font/google";
import LogoNavbar from "@/assets/logo-navbar";
import { ThemeToggle } from "../ThemeToggle";

const getNanum = Nanum_Pen_Script({
    subsets: ["latin"],
    weight: "400",
});

export function NavBar() {
    return (
        <div className="fixed top-0 left-0 w-full py-3 flex items-center justify-center">
            <div className="mx-12 h-14 w-full rounded-lg px-5 flex justify-between items-center">
                <div className="flex gap-x-2 items-center">
                    <LogoNavbar />
                    <h1 className={`${getNanum.className} text-2xl`}>Sorveccino</h1>
                </div>
                <div className="flex items-center">
                    <ThemeToggle />
                </div>
            </div>
        </div>
    );
}