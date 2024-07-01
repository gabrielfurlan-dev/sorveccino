"use client";

import * as React from "react";
import LogoNavbar from "../../assets/logo-navbar";
import { Poppins } from "next/font/google";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BellSimple } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOutWithGoogle } from "@/actions/signOutAction";

const poppins = Poppins({
    subsets: ['latin'],
    weight: '400',
});

interface Navbar {
    href: string,
}

export function NavBar({ href }: Navbar) {
    const session = useSession();
    const router = useRouter();

    const handleSignOut = async (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        await signOutWithGoogle();
        router.push('/');
    };

    return (
        <nav className="flex items-center h-16 w-full">
            <div className="flex items-center pl-12 gap-3">
                <div onClick={() => router.push('/inicio')} className="cursor-pointer">
                    <LogoNavbar width={24} height={33} />
                </div>
                <div className="flex flex-col w-[300px]">
                    <h1 className={`text-[17px] ${poppins.className}`}>
                        {href}
                    </h1>
                    <h1 className={`text-[12px] text-slate-400 ${poppins.className}`}>
                        Gerencie seu negócio.
                    </h1>
                </div>
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
                                        <AvatarImage src={session.data?.user?.image ?? undefined} /> {/* Terá que dar get no usuário para pegar a imagem*/}
                                    </Avatar>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Minha Conta</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-3">
                        <DropdownMenuLabel>{session.data?.user?.name}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Perfil</DropdownMenuItem>
                        <DropdownMenuItem>Configurações</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut}>Sair</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
}