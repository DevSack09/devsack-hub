"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type FilterItem = { id: string; name: string; slug: string };

type FilterPillsProps = {
  label: string;
  items: FilterItem[];
  selected: string[];
  onToggle: (slug: string) => void;
  activeClassName?: string;
};

export function FilterPills({
  label,
  items,
  selected,
  onToggle,
  activeClassName = "border-dev-blue bg-dev-blue/10 text-dev-blue",
}: FilterPillsProps) {
  if (items.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <span className="font-secondary text-xs font-medium uppercase tracking-wide text-foreground/50">
        {label}
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
                "rounded-full border px-3.5 py-1.5 font-secondary text-sm transition-colors",
                isActive
                  ? activeClassName
                  : "border-border bg-surface text-foreground/70 hover:border-dev-blue/60 hover:text-foreground"
              )}
            >
              {item.name}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
