"use client"
import { Nanum_Pen_Script } from "next/font/google";
import { motion } from "framer-motion"
import IceCream from "../../../images/ice-cream";
import IceCreamCone from "../../../images/ice-cream-cone";

const nanum = Nanum_Pen_Script({
    subsets: ["latin"],
    weight: '400',
});

const placard = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 3,
        }
    }
};

const letter = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

interface LoadingProps {
    isLoading: boolean;
}

export default function Loading({ isLoading }: LoadingProps) {
    const text = "Sorveccino";

    if (!isLoading) return null;

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col gap-y-3">
                <div className="flex w-full justify-center pr-4">
                    <IceCream />
                </div>
                <IceCreamCone />
            </div>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={placard}
                className={`placard ${nanum.className}`}
            >
                {text.split("").map((char, index) => (
                    <motion.span key={index} variants={letter}>
                        {char}
                    </motion.span>
                ))}
            </motion.div>
        </div>
    )
}