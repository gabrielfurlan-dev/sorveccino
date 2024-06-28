"use server"

import { signOut } from "@/auth"

export async function signOutWithGoogle() {
    await signOut();
} 