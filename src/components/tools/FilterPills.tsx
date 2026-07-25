"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { pixelBody, pixelCorner } from "@/components/pixel/pixel-kit";

type FilterItem = { id: string; name: string; slug: string };

type FilterPillsProps = {
  label: string;
  items: FilterItem[];
  selected: string[];
  onToggle: (slug: string) => void;
  accent?: "blue" | "green";
  // "solid" marca la selección única (categoría) con más peso visual;
  // "outline" marca la selección múltiple (tags/tecnologías) como chips activables.
  variant?: "solid" | "outline";
};

const ACCENT_STYLES = {
  blue: {
    solid: "border-dev-blue bg-dev-blue text-black",
    outline: "border-dev-blue bg-dev-blue/10 text-dev-blue",
  },
  green: {
    solid: "border-dev-green bg-dev-green text-black",
    outline: "border-dev-green bg-dev-green/10 text-dev-green",
  },
} as const;

export function FilterPills({
  label,
  items,
  selected,
  onToggle,
  accent = "blue",
  variant = "outline",
}: FilterPillsProps) {
  if (items.length === 0) return null;

  return (
    <div className="flex flex-col gap-2.5">
      <span className={`${pixelBody.className} text-sm tracking-widest text-foreground/50`}>
        {label.toUpperCase()}
      </span>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const isActive = selected.includes(item.slug);

          return (
            <motion.button
              key={item.id}
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => onToggle(item.slug)}
              aria-pressed={isActive}
              className={cn(
                `${pixelBody.className} border-2 px-3.5 py-1.5 text-sm tracking-wide transition-colors`,
                isActive
                  ? ACCENT_STYLES[accent][variant]
                  : "border-border bg-surface text-foreground/70 hover:border-dev-green/60 hover:text-foreground"
              )}
              style={{ clipPath: pixelCorner(4) }}
            >
              {item.name}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
