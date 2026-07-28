import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getToolBySlug } from "@/lib/data/tools";
import { ToolDetail } from "@/components/tools/ToolDetail";

type ToolPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);
  if (!tool) return {};

  return {
    title: `${tool.name} | Dev.Sack Hub`,
    description: tool.description,
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool || tool.status !== "ACTIVE") notFound();

  return <ToolDetail tool={tool} />;
}
