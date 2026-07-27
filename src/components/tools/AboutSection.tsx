"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import {
  fadeInUp,
  fadeInUpReduced,
  staggerContainer,
  staggerContainerReduced,
} from "@/components/tools/motion-variants";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { monoBody, pixelBody, pixelCorner } from "@/components/pixel/pixel-kit";

export function AboutSection() {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLanguage();
  const item = shouldReduceMotion ? fadeInUpReduced : fadeInUp;

  return (
    <motion.section
      id="sobre-el-proyecto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={shouldReduceMotion ? staggerContainerReduced : staggerContainer}
      className="scroll-mt-24 border-2 border-border bg-surface/60 px-6 py-12 text-center sm:px-12 sm:py-16"
      style={{ clipPath: pixelCorner(14) }}
    >
      <motion.div variants={item} className="flex items-center justify-center gap-2.5">
        <Heart size={20} className="text-dev-green" />
        <h2 className={`${pixelBody.className} text-2xl tracking-wide text-foreground sm:text-3xl`}>
          {t.about.heading}
        </h2>
      </motion.div>

      <motion.p
        variants={item}
        className={`${monoBody.className} mx-auto mt-6 max-w-2xl text-base text-foreground/60 sm:text-lg`}
      >
        {t.about.paragraph1}
      </motion.p>
      <motion.p
        variants={item}
        className={`${monoBody.className} mx-auto mt-4 max-w-2xl text-base text-foreground/60 sm:text-lg`}
      >
        {t.about.paragraph2}
      </motion.p>

      <motion.div variants={item} className="mt-8">
        <a
          href="#herramientas"
          className={`${pixelBody.className} inline-flex items-center gap-2 bg-dev-green px-6 py-3 text-lg tracking-wide text-black transition-colors hover:bg-dev-green/90`}
          style={{ clipPath: pixelCorner(6) }}
        >
          {t.about.cta}
          <ArrowRight size={16} />
        </a>
      </motion.div>
    </motion.section>
  );
}
