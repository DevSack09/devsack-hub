import { Suspense } from "react";
import type { Metadata } from "next";
import { getActiveTools, getFeaturedTools } from "@/lib/data/tools";
import { getCategories } from "@/lib/data/categories";
import { getTags } from "@/lib/data/tags";
import { getTechnologies } from "@/lib/data/technologies";
import { Hero } from "@/components/tools/Hero";
import { FeaturedSection } from "@/components/tools/FeaturedSection";
import { ToolsExplorer } from "@/components/tools/ToolsExplorer";
import { ExplorerHeading } from "@/components/tools/ExplorerHeading";
import { AboutSection } from "@/components/tools/AboutSection";
import { PixelGrid } from "@/components/pixel/pixel-kit";

export const metadata: Metadata = {
  title: "Dev.Sack Hub | Herramientas",
  description: "Galería de herramientas, IA, componentes y utilidades curadas por Dev.Sack.",
};

export default async function HomePage() {
  const [tools, featuredTools, categories, tags, technologies] = await Promise.all([
    getActiveTools(),
    getFeaturedTools(),
    getCategories(),
    getTags(),
    getTechnologies(),
  ]);

  return (
    <>
      <Hero />

      <main className="relative">
        {/* Puente visual: funde el fondo forzado oscuro del Hero con el tema
            actual del visitante, para que el scroll no se sienta como un corte
            entre dos sitios distintos (seamless en tema oscuro, degradado suave en claro). */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-[#020617] to-background sm:h-40"
        />
        <PixelGrid
          className="-z-10 top-0 h-32 opacity-20 sm:h-40"
          size={32}
          fadeToBottom
        />

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-20 px-4 pb-24 pt-36 sm:pt-44 md:px-8">
          <FeaturedSection tools={featuredTools} />

          <section id="herramientas" className="scroll-mt-24">
            <ExplorerHeading hasFeatured={featuredTools.length > 0} />
            <Suspense fallback={null}>
              <ToolsExplorer
                tools={tools}
                categories={categories}
                tags={tags}
                technologies={technologies}
              />
            </Suspense>
          </section>

          <AboutSection />
        </div>
      </main>
    </>
  );
}
