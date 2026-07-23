"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { incrementToolClicks } from "@/lib/actions/tools";
import { fadeInUp, fadeInUpReduced } from "@/components/tools/motion-variants";
import type { ToolWithRelations } from "@/types";

export function ToolCard({ tool, priority = false }: { tool: ToolWithRelations; priority?: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const visibleTags = tool.tags.slice(0, 3);
  const extraTags = tool.tags.length - visibleTags.length;

  return (
    <motion.div
      variants={shouldReduceMotion ? fadeInUpReduced : fadeInUp}
      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-md shadow-black/5 transition-shadow hover:shadow-xl hover:shadow-black/10 dark:shadow-black/20 dark:hover:shadow-black/40"
    >
      <div className="relative h-40 w-full overflow-hidden bg-border/30">
        {tool.imageUrl ? (
          <Image
            src={tool.imageUrl}
            alt=""
            fill
            unoptimized
            priority={priority}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-dev-blue/20 to-dev-green/20">
            <span className="font-primary text-3xl font-bold text-foreground/30">
              {tool.name.charAt(0)}
            </span>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 font-secondary text-xs text-white backdrop-blur-sm">
          {tool.category.name}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="font-primary text-base font-bold text-foreground">{tool.name}</h3>
          <p className="mt-1 line-clamp-2 font-secondary text-sm text-foreground/60">
            {tool.description}
          </p>
        </div>

        {visibleTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {visibleTags.map((tag) => (
              <span
                key={tag.id}
                className="rounded-full bg-border/50 px-2 py-0.5 font-secondary text-xs text-foreground/70"
              >
                {tag.name}
              </span>
            ))}
            {extraTags > 0 && (
              <span className="rounded-full bg-border/50 px-2 py-0.5 font-secondary text-xs text-foreground/50">
                +{extraTags}
              </span>
            )}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center gap-0.5" aria-label={`Recomendación: ${tool.recommendationLevel} de 5`}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={14}
                className={
                  index < tool.recommendationLevel
                    ? "fill-dev-green text-dev-green"
                    : "text-border"
                }
              />
            ))}
          </div>

          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              incrementToolClicks(tool.id);
            }}
            className="flex items-center gap-1.5 rounded-full bg-dev-blue px-3 py-1.5 font-secondary text-xs font-medium text-black transition-colors hover:bg-dev-blue/90"
          >
            Visitar
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
