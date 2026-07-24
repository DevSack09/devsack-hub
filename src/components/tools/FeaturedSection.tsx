"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ToolCard } from "@/components/tools/ToolCard";
import {
  staggerContainer,
  staggerContainerReduced,
} from "@/components/tools/motion-variants";
import type { ToolWithRelations } from "@/types";

export function FeaturedSection({ tools }: { tools: ToolWithRelations[] }) {
  const shouldReduceMotion = useReducedMotion();

  if (tools.length === 0) return null;

  return (
    <section id="destacadas" className="scroll-mt-24">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles size={18} className="text-dev-green" />
        <h2 className="font-primary text-xl font-bold text-foreground">Destacadas</h2>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={shouldReduceMotion ? staggerContainerReduced : staggerContainer}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {tools.map((tool, index) => (
          <ToolCard key={tool.id} tool={tool} priority={index < 2} />
        ))}
      </motion.div>
    </section>
  );
}
