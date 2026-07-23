"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  fadeInUp,
  fadeInUpReduced,
  staggerContainer,
  staggerContainerReduced,
} from "@/components/tools/motion-variants";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const item = shouldReduceMotion ? fadeInUpReduced : fadeInUp;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={shouldReduceMotion ? staggerContainerReduced : staggerContainer}
      className="mx-auto max-w-2xl text-center"
    >
      <motion.h1 variants={item} className="font-primary text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        El <span className="text-dev-blue">hub</span> de herramientas de{" "}
        <span className="text-dev-green">Dev.Sack</span>
      </motion.h1>
      <motion.p variants={item} className="mt-4 font-secondary text-base text-foreground/60 sm:text-lg">
        Todo lo que uso día a día — IA, componentes, librerías, docs e inspiración —
        centralizado en un solo lugar.
      </motion.p>
    </motion.div>
  );
}
