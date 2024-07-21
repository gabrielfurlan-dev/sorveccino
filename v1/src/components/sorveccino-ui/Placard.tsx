"use client"
import { motion } from "framer-motion"
import { Nanum_Pen_Script, Poppins } from "next/font/google";

interface PlacardProps {
    textPlacard: string,
    fontFamily: "poppins" | "nanum",
}

const getPoppins = Poppins({
    subsets: ["latin"],
    weight: "400",
});

const getNanum = Nanum_Pen_Script({
    subsets: ["latin"],
    weight: "400",
});

const placardVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 2,
        },
    },
};

const letterVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

export default function Placard({ textPlacard, fontFamily }: PlacardProps) {
    // Determinando a fonte com base na propriedade fontFamily
    const fontConfig = fontFamily === "poppins" ? getPoppins : getNanum;
    const fontClass = fontConfig.className;

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={placardVariants}
            className={`placard ${fontClass}`}
        >
            {textPlacard.split("").map((char, index) => (
                <motion.span key={index} variants={letterVariants}>
                    {char}
                </motion.span>
            ))}
        </motion.div>
    );
}