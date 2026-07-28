"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check, Link2 } from "lucide-react";
import { incrementToolClicks } from "@/lib/actions/tools";
import {
  fadeInUp,
  fadeInUpReduced,
  staggerContainer,
  staggerContainerReduced,
} from "@/components/tools/motion-variants";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  BOX,
  PixelGrid,
  PixelIcon,
  STAR,
  monoBody,
  pixelBody,
  pixelCorner,
  pixelDisplay,
} from "@/components/pixel/pixel-kit";
import type { ToolWithRelations } from "@/types";

function getHostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function ToolDetail({ tool }: { tool: ToolWithRelations }) {
  const shouldReduceMotion = useReducedMotion();
  const router = useRouter();
  const { t } = useLanguage();
  const item = shouldReduceMotion ? fadeInUpReduced : fadeInUp;
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.main
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0.01 : 0.45, ease: "easeOut" }}
      className="mx-auto max-w-[100rem] px-4 pb-24 pt-28 sm:pt-36 md:px-8"
    >
      <div className="mb-8 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => {
            // Si se llegó desde otra página del propio sitio (navegación normal desde
            // la galería), router.back() preserva el scroll/búsqueda previos. Si se
            // entró directo (link compartido, nueva pestaña), no hay historial propio
            // que recuperar, así que volvemos al catálogo en vez de salir del sitio.
            const cameFromThisSite = document.referrer.startsWith(window.location.origin);
            if (cameFromThisSite) {
              router.back();
            } else {
              router.push("/#herramientas");
            }
          }}
          className={`${pixelBody.className} flex items-center gap-2 border border-border px-3 py-1.5 text-sm tracking-wide text-foreground/60 transition-colors hover:border-dev-green/60 hover:text-foreground`}
          style={{ clipPath: pixelCorner(3) }}
        >
          <ArrowLeft size={14} />
          {t.detail.back}
        </button>

        <button
          type="button"
          onClick={handleCopyLink}
          aria-label={copied ? t.detail.copyLinkSuccess : t.detail.copyLink}
          title={copied ? t.detail.copyLinkSuccess : t.detail.copyLink}
          className="flex h-9 w-9 items-center justify-center border border-border text-foreground/60 transition-colors hover:border-dev-green/60 hover:text-foreground"
          style={{ clipPath: pixelCorner(3) }}
        >
          {copied ? <Check size={14} className="text-dev-green" /> : <Link2 size={14} />}
        </button>
      </div>

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(380px,480px)_1fr] lg:gap-14">
        {/* Columna izquierda: información de la herramienta, revelada en cascada */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={shouldReduceMotion ? staggerContainerReduced : staggerContainer}
          className="flex flex-col gap-6"
        >
          <motion.span
            variants={item}
            className={`${pixelBody.className} w-fit border border-dev-green/60 px-3 py-1 text-xs tracking-widest text-dev-green`}
            style={{ clipPath: pixelCorner(3) }}
          >
            {tool.category.name.toUpperCase()}
          </motion.span>

          <motion.h1
            variants={item}
            className={`${pixelDisplay.className} w-fit text-2xl leading-snug tracking-tight text-foreground sm:text-3xl md:text-4xl`}
            style={{ transform: "scaleX(0.85)", transformOrigin: "left" }}
          >
            {tool.name}
          </motion.h1>

          <motion.div
            variants={item}
            className="flex items-center gap-0.5"
            aria-label={`${t.card.ratingLabel}: ${tool.recommendationLevel} ${t.card.ratingOf}`}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <PixelIcon
                key={index}
                glyph={STAR}
                size={16}
                className={index < tool.recommendationLevel ? "text-dev-green" : "text-border"}
              />
            ))}
          </motion.div>

          <motion.p
            variants={item}
            className={`${monoBody.className} text-base leading-relaxed text-foreground/70 sm:text-lg`}
          >
            {tool.description}
          </motion.p>

          {tool.technologies.length > 0 && (
            <motion.div variants={item} className="flex flex-col gap-2.5">
              <span className={`${pixelBody.className} text-sm tracking-widest text-foreground/50`}>
                {t.detail.technologiesLabel.toUpperCase()}
              </span>
              <div className="flex flex-wrap gap-2">
                {tool.technologies.map((technology) => (
                  <span
                    key={technology.id}
                    className={`${pixelBody.className} border border-dev-blue/50 bg-dev-blue/10 px-3 py-1 text-sm tracking-wide text-dev-blue`}
                    style={{ clipPath: pixelCorner(3) }}
                  >
                    {technology.name}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {tool.tags.length > 0 && (
            <motion.div variants={item} className="flex flex-col gap-2.5">
              <span className={`${pixelBody.className} text-sm tracking-widest text-foreground/50`}>
                {t.detail.tagsLabel.toUpperCase()}
              </span>
              <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className={`${pixelBody.className} border border-border/80 px-3 py-1 text-sm tracking-wide text-foreground/60`}
                    style={{ clipPath: pixelCorner(3) }}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          <motion.a
            variants={item}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => incrementToolClicks(tool.id)}
            className="mt-4 inline-flex w-fit items-center gap-2 border-2 border-dev-blue px-5 py-3 font-secondary text-sm font-semibold text-dev-blue transition-colors hover:bg-dev-blue hover:text-black sm:text-base"
            style={{ clipPath: pixelCorner(6) }}
          >
            {t.detail.visit}
            <ArrowUpRight size={16} />
          </motion.a>
        </motion.div>

        {/* Columna derecha: preview del sitio, estilo ventana de navegador */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div
            className="overflow-hidden border-2 border-border bg-surface/60 transition-all duration-300 hover:border-dev-blue/60 hover:shadow-[0_0_0_1px_rgba(56,182,255,0.25),0_18px_36px_-14px_rgba(56,182,255,0.4)] dark:hover:shadow-[0_0_0_1px_rgba(56,182,255,0.3),0_18px_36px_-14px_rgba(56,182,255,0.5)]"
            style={{ clipPath: pixelCorner(12) }}
          >
            <div className="flex items-center gap-2 border-b-2 border-border bg-surface px-4 py-2.5">
              <span className="h-2.5 w-2.5 bg-dev-blue/70" style={{ clipPath: pixelCorner(1) }} />
              <span className="h-2.5 w-2.5 bg-dev-green/70" style={{ clipPath: pixelCorner(1) }} />
              <span className="h-2.5 w-2.5 bg-border" style={{ clipPath: pixelCorner(1) }} />
              <span className={`${monoBody.className} ml-2 truncate text-xs text-foreground/50`}>
                {getHostname(tool.url)}
              </span>
            </div>

            <div className="relative aspect-video w-full">
              {tool.imageUrl ? (
                <Image
                  src={tool.imageUrl}
                  alt={tool.name}
                  fill
                  unoptimized
                  priority
                  className="object-contain"
                />
              ) : (
                <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-dev-blue/10 to-dev-green/10">
                  <PixelGrid className="opacity-40" size={20} />
                  <div className="relative flex flex-col items-center gap-3">
                    <PixelIcon glyph={BOX} size={48} className="text-foreground/20" />
                    <span className={`${pixelBody.className} text-sm text-foreground/40`}>
                      {t.detail.noPreview}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
