"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ToolCard } from "@/components/tools/ToolCard";
import {
  staggerContainer,
  staggerContainerReduced,
} from "@/components/tools/motion-variants";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { PixelIcon, STAR, pixelBody } from "@/components/pixel/pixel-kit";
import type { ToolWithRelations } from "@/types";

export function FeaturedSection({ tools }: { tools: ToolWithRelations[] }) {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLanguage();

  if (tools.length === 0) return null;

  return (
    <section id="destacadas" className="scroll-mt-24">
      <div className="mb-6 flex items-center gap-2.5">
        <PixelIcon glyph={STAR} size={20} className="text-dev-green" />
        <h2 className={`${pixelBody.className} text-2xl tracking-wide text-foreground sm:text-3xl`}>
          {t.featured.heading}
        </h2>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={shouldReduceMotion ? staggerContainerReduced : staggerContainer}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {tools.map((tool, index) => (
          <ToolCard key={tool.id} tool={tool} priority={index < 2} />
        ))}
      </motion.div>
    </section>
  );
}
