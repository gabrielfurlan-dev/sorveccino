"use client"

import * as React from "react";
import LogoNavbar from "../../../images/logo-navbar";
import { Nanum_Pen_Script } from "next/font/google";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BellSimple, Moon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./ThemeToggle";

const nanum = Nanum_Pen_Script({
    subsets: ['latin'],
    weight: '400',
})

export function NavBar() {
    return (
        <nav className="flex items-center h-16 w-full">
            <div className="flex items-center pl-12 gap-3">
                <LogoNavbar width={22} height={31} />
                <h1 className={`text-[22px] mt-1 ${nanum.className}`}>
                    Sorveccino
                </h1>
            </div>
            <div className="flex justify-end w-full pr-6 gap-2">
                <ThemeToggle />
                <TooltipProvider delayDuration={200}>
                    <Tooltip>
                        <TooltipTrigger>
                            <Button variant="outline" size="icon">
                                <BellSimple className="h-[1.2rem] w-[1.2rem]" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Notificações</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Avatar className="h-9 w-9 cursor-pointer">
                                        <AvatarImage src="https://avatars.githubusercontent.com/u/79483921?v=4" /> {/* Terá que dar get no usuário para pegar a imagem*/}
                                    </Avatar></TooltipTrigger>
                                <TooltipContent>
                                    <p>Minha Conta</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-3">
                        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Perfil</DropdownMenuItem>
                        <DropdownMenuItem>Configurações</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Sair</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    )
}