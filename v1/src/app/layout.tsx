import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import React from "react";
import Providers from "./providers";
import { Toaster } from "@/components/ui/sonner"
import { SessionProvider } from "next-auth/react";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sorveccino",
  description: "Made by Gabriel Furlan",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <SessionProvider>
          <Providers>
            {children}
            <Toaster position="top-right" richColors />
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
