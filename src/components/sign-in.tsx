import { signInWithGoogle } from "@/actions/signInAction";
import React from "react";

export function SignIn() {
  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await signInWithGoogle();
  };

  return (
    <form onSubmit={handleSignIn}>
      <button type="submit">Sign in with Google</button>
    </form>
  );
}