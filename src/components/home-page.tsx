"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Loading from "../app/loading/loading";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GoogleLogo } from "@phosphor-icons/react/dist/ssr";
import Placard from "@/components/sorveccino-ui/Placard";
import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import { Logo } from "@/assets/logo";

interface HomePageProps {
  session: any;
}

export default function HomePage({ session }: HomePageProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5500);

    return () => clearTimeout(timer);
  }, []);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.5,
      },
    },
  };

  const variants2 = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 2,
      },
    },
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
      <Loading isLoading={isLoading} />
      {!isLoading && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          className="flex flex-col gap-y-8"
        >
          <motion.div className="flex w-full justify-center">
            <Placard textPlacard="Bem vindo(a) a Sorveccino!" fontFamily="poppins" />
          </motion.div>
          <motion.div variants={variants2} className="flex w-full justify-center">
            <Logo />
          </motion.div>
          <motion.div variants={variants2} className="flex w-full justify-center">
            {session?.user?.name}
          </motion.div>
          <motion.div variants={variants2} className="flex w-full justify-center">
            {session ? <SignOut /> : <SignIn />}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}