"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ToolCard } from "@/components/tools/ToolCard";
import { EmptyState } from "@/components/tools/EmptyState";
import {
  staggerContainer,
  staggerContainerReduced,
} from "@/components/tools/motion-variants";
import type { ToolWithRelations } from "@/types";

export function ToolGrid({ tools, emptyMessage }: { tools: ToolWithRelations[]; emptyMessage: string }) {
  const shouldReduceMotion = useReducedMotion();

  if (tools.length === 0) {
    return <EmptyState message={emptyMessage} />;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={shouldReduceMotion ? staggerContainerReduced : staggerContainer}
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </motion.div>
  );
}
