import { Suspense } from "react";
import type { Metadata } from "next";
import { getActiveTools, getFeaturedTools } from "@/lib/data/tools";
import { getCategories } from "@/lib/data/categories";
import { getTags } from "@/lib/data/tags";
import { getTechnologies } from "@/lib/data/technologies";
import { Hero } from "@/components/tools/Hero";
import { FeaturedSection } from "@/components/tools/FeaturedSection";
import { ToolsExplorer } from "@/components/tools/ToolsExplorer";

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

      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-4 pb-24 pt-16 md:px-8">
        <FeaturedSection tools={featuredTools} />

        <section id="herramientas" className="scroll-mt-24">
          <h2 className="mb-4 font-primary text-xl font-bold text-foreground">
            {featuredTools.length > 0 ? "Todas las herramientas" : "Herramientas"}
          </h2>
          <Suspense fallback={null}>
            <ToolsExplorer
              tools={tools}
              categories={categories}
              tags={tags}
              technologies={technologies}
            />
          </Suspense>
        </section>
      </main>
    </>
  );
}
