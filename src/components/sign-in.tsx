import { signInWithGoogle } from "@/actions/signInAction";
import React from "react";
import { Button } from "./ui/button";
import { GoogleLogo } from "@phosphor-icons/react/dist/ssr";

export function SignIn() {
  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await signInWithGoogle();
  };

  return (
    <form onSubmit={handleSignIn}>
      <Button type="submit" variant="outline" className="w-[448px] h-[56px] gap-2"> <GoogleLogo size={24} /> Sign in with Google</Button>
    </form>
  );
}