import { signInWithGoogle } from "@/actions/signInAction";
import React from "react";
import { Button } from "./ui/button";
import { GoogleLogo } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";

export function SignIn() {
  // const router = useRouter()
  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await signInWithGoogle();
    // router.push('/inicio')
  };

  return (
    <form onSubmit={handleSignIn}>
      <Button type="submit" variant="outline" className="w-[448px] h-[56px] gap-2"> <GoogleLogo size={24} />Entrar com o Google</Button>
    </form>
  );
}