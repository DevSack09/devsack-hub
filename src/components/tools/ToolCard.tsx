"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { incrementToolClicks } from "@/lib/actions/tools";
import { fadeInUp, fadeInUpReduced } from "@/components/tools/motion-variants";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  BOX,
  PixelGrid,
  PixelIcon,
  STAR,
  monoBody,
  pixelBody,
  pixelCorner,
} from "@/components/pixel/pixel-kit";
import type { ToolWithRelations } from "@/types";

export function ToolCard({ tool, priority = false }: { tool: ToolWithRelations; priority?: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLanguage();
  const visibleTags = tool.tags.slice(0, 3);
  const extraTags = tool.tags.length - visibleTags.length;

  return (
    <motion.div
      variants={shouldReduceMotion ? fadeInUpReduced : fadeInUp}
      whileHover={shouldReduceMotion ? undefined : { y: -6 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group relative flex h-full flex-col overflow-hidden border-2 border-border bg-surface transition-colors duration-200 hover:border-dev-blue/70 hover:shadow-[0_0_0_1px_rgba(56,182,255,0.25),0_18px_36px_-14px_rgba(56,182,255,0.4)] dark:hover:shadow-[0_0_0_1px_rgba(56,182,255,0.3),0_18px_36px_-14px_rgba(56,182,255,0.5)]"
      style={{ clipPath: pixelCorner(10) }}
    >
      {tool.isFeatured && (
        <span
          className={`${pixelBody.className} absolute right-3 top-3 z-10 flex items-center gap-1 border border-dev-green/70 bg-background/90 px-2 py-1 text-xs tracking-wider text-dev-green backdrop-blur-sm`}
          style={{ clipPath: pixelCorner(3) }}
        >
          <PixelIcon glyph={STAR} size={10} />
          {t.card.featuredBadge}
        </span>
      )}

      <div className="relative h-40 w-full overflow-hidden border-b-2 border-border bg-border/20">
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
          <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-dev-blue/10 to-dev-green/10">
            <PixelGrid className="opacity-40" size={16} />
            <PixelIcon glyph={BOX} size={40} className="relative text-foreground/20" />
          </div>
        )}
        <span
          className={`${pixelBody.className} absolute left-3 top-3 border border-border bg-background/85 px-2 py-1 text-xs tracking-wider text-foreground/80 backdrop-blur-sm`}
          style={{ clipPath: pixelCorner(3) }}
        >
          {tool.category.name.toUpperCase()}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3
            className={`${pixelBody.className} text-xl tracking-wide text-foreground transition-colors group-hover:text-dev-blue`}
          >
            {tool.name}
          </h3>
          <p className={`${monoBody.className} mt-1.5 line-clamp-2 text-sm text-foreground/60`}>
            {tool.description}
          </p>
        </div>

        {visibleTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {visibleTags.map((tag) => (
              <span
                key={tag.id}
                className={`${pixelBody.className} border border-border/80 px-2 py-0.5 text-xs tracking-wide text-foreground/60`}
                style={{ clipPath: pixelCorner(2) }}
              >
                {tag.name}
              </span>
            ))}
            {extraTags > 0 && (
              <span className={`${pixelBody.className} px-1.5 py-0.5 text-xs text-foreground/40`}>
                +{extraTags}
              </span>
            )}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <div
            className="flex items-center gap-0.5"
            aria-label={`${t.card.ratingLabel}: ${tool.recommendationLevel} ${t.card.ratingOf}`}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <PixelIcon
                key={index}
                glyph={STAR}
                size={12}
                className={index < tool.recommendationLevel ? "text-dev-green" : "text-border"}
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
            className={`${pixelBody.className} flex items-center gap-1.5 bg-dev-blue px-3 py-1.5 text-sm tracking-wide text-black transition-colors hover:bg-dev-blue/90`}
            style={{ clipPath: pixelCorner(3) }}
          >
            {t.card.visit}
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
