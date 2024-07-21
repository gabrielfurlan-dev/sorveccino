import { signOutWithGoogle } from "@/actions/signOutAction"
import React from "react";
import { Button } from "./ui/button";

export function SignOut() {
    const handleSignOut = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await signOutWithGoogle();
    };

    return (
        <form onSubmit={handleSignOut}>
            <Button type="submit" variant="outline" className="w-[448px] h-[56px] gap-2">Sair</Button>
        </form>
    )
}