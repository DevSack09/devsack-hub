"use client";

import { memo, useEffect, useLayoutEffect, useMemo } from "react";
import { motion, useAnimation, useReducedMotion, type Variants } from "framer-motion";
import { ToolCard } from "@/components/tools/ToolCard";
import { EmptyState } from "@/components/tools/EmptyState";
import { staggerContainerReduced } from "@/components/tools/motion-variants";
import type { ToolWithRelations } from "@/types";

// Tope al delay total del stagger: con muchas herramientas, 0.08s fijo por
// card haría que las últimas tarden varios segundos en aparecer incluso en
// una primera visita si el usuario baja rápido con el scroll.
const MAX_STAGGER_SPREAD_SECONDS = 0.5;

// La revelación en cascada solo tiene sentido la primera vez que el visitante
// ve el listado en esta pestaña. Si ya se mostró (p. ej. el usuario vuelve
// desde la página de detalle de una herramienta y el navegador restaura el
// scroll a mitad del listado), volver a animar cada card desde 0 dejaría al
// usuario mirando una zona "vacía" mientras espera su turno en el stagger.
const GRID_ALREADY_SHOWN_KEY = "devsack-tools-grid-shown";

// useLayoutEffect no existe en el servidor (React tira warning si se usa
// incondicionalmente en un árbol SSR). En el cliente lo preferimos sobre
// useEffect porque corre antes del primer paint, evitando un parpadeo del
// estado "hidden" para quien ya vio el listado antes en esta pestaña.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const ToolGrid = memo(function ToolGrid({
  tools,
  emptyMessage,
}: {
  tools: ToolWithRelations[];
  emptyMessage: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const controls = useAnimation();

  // Tanto el servidor como la primera pasada del cliente SIEMPRE arrancan
  // en "hidden" (nada depende de sessionStorage durante el render), así que
  // no hay forma de que la hidratación encuentre un desajuste. Recién acá,
  // ya montado, decidimos si saltar la animación de forma imperativa.
  useIsomorphicLayoutEffect(() => {
    const alreadyShown = sessionStorage.getItem(GRID_ALREADY_SHOWN_KEY) === "1";
    sessionStorage.setItem(GRID_ALREADY_SHOWN_KEY, "1");

    if (alreadyShown || shouldReduceMotion) {
      controls.set("visible");
    } else {
      controls.start("visible");
    }
  }, [controls, shouldReduceMotion]);

  const staggerContainer = useMemo<Variants>(
    () => ({
      hidden: {},
      visible: {
        transition: { staggerChildren: Math.min(0.08, MAX_STAGGER_SPREAD_SECONDS / tools.length) },
      },
    }),
    [tools.length]
  );

  if (tools.length === 0) {
    return <EmptyState message={emptyMessage} />;
  }

  return (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={shouldReduceMotion ? staggerContainerReduced : staggerContainer}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </motion.div>
  );
});
