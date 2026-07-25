"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, Globe, SquareCode } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { PixelIcon, STAR, pixelBody, pixelCorner, pixelDisplay } from "@/components/pixel/pixel-kit";

// Fecha fija, actualizar a mano cuando corresponda.
const LAST_UPDATED = "23 de julio de 2026";

export function Footer() {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLanguage();

  // lucide-react ya no incluye logos de marca (GitHub/LinkedIn); se usan íconos
  // genéricos equivalentes en su lugar para no depender de otra librería.
  // TODO: reemplazar "#" por las URLs reales (GitHub, LinkedIn, portafolio) cuando se definan.
  const SOCIAL_LINKS = [
    { label: "GitHub", href: "#", icon: SquareCode, accent: "blue" },
    { label: "LinkedIn", href: "#", icon: Briefcase, accent: "green" },
    { label: t.footer.portfolioLabel, href: "#", icon: Globe, accent: "blue" },
  ] as const;

  return (
    <footer id="footer" className="mx-4 mt-24 scroll-mt-24 border-t-2 border-border py-10 md:mx-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <Link href="/" className="flex items-center gap-2">
          <PixelIcon glyph={STAR} size={16} className="text-dev-green" />
          <span className={`${pixelDisplay.className} text-[10px] tracking-tight`}>
            <span className="text-dev-blue">DEV</span>
            <span className="text-dev-green">.</span>
            <span className="text-foreground">SACK</span>
          </span>
        </Link>

        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((link) => {
              const Icon = link.icon;
              const isBlue = link.accent === "blue";
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.12, y: -2 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className={`flex h-10 w-10 items-center justify-center border-2 border-border bg-surface text-foreground/60 transition-colors duration-200 ${
                    isBlue
                      ? "hover:border-dev-blue hover:text-dev-blue hover:shadow-[0_0_14px_rgba(56,182,255,0.5)]"
                      : "hover:border-dev-green hover:text-dev-green hover:shadow-[0_0_14px_rgba(3,250,110,0.5)]"
                  }`}
                  style={{ clipPath: pixelCorner(4) }}
                >
                  <Icon size={18} />
                </motion.a>
              );
            })}
          </div>

          <p className={`${pixelBody.className} text-base text-foreground/50`}>
            {t.footer.madeWithPrefix} <span className="text-dev-blue">❤</span> {t.footer.madeWithMiddle}{" "}
            <span className="text-dev-green">☕</span> {t.footer.madeWithSuffix}
          </p>
        </div>

        <div className={`${pixelBody.className} text-base leading-tight text-foreground/40`}>
          <p>{t.footer.lastUpdatedLabel}</p>
          <p className="text-foreground/60">{LAST_UPDATED}</p>
        </div>
      </div>
    </footer>
  );
}
