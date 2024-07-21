"use client"
import { Poppins } from "next/font/google"
import { ReactElement } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"

interface Card {
    text: string,
    route: string,
    icon: ReactElement
}

const poppins = Poppins({
    subsets: ['latin'],
    weight: '400',
});

export function CardInitialPage({ text, route, icon }: Card) {
    const router = useRouter()
    const { theme } = useTheme();
    const isDark = theme === "dark" || theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches;

    return (
        <div className={`flex flex-col justify-center items-center h-[96px] w-[96px] bg-black hover:bg-purple-700 rounded-[10px] cursor-pointer text-neutral-200 gap-1 transition hover:scale-105 hover:transition-colors`}
            onClick={() => router.push(`/${route}`)}
        >
            {icon}
            <div className="flex justify-center w-full">
                <h1 className={`text-[12px] ${poppins.className}`}>{text}</h1>
            </div>
        </div>
    )
}