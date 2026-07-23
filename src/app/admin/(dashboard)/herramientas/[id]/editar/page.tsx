import { notFound } from "next/navigation";
import { getToolById } from "@/lib/data/tools";
import { getCategories } from "@/lib/data/categories";
import { getTags } from "@/lib/data/tags";
import { getTechnologies } from "@/lib/data/technologies";
import { ToolForm } from "@/components/admin/ToolForm";

export default async function EditarHerramientaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [tool, categories, tags, technologies] = await Promise.all([
    getToolById(id),
    getCategories(),
    getTags(),
    getTechnologies(),
  ]);

  if (!tool) notFound();

  return (
    <div>
      <h1 className="font-primary text-3xl font-bold text-foreground">Editar herramienta</h1>
      <div className="mt-6">
        <ToolForm
          mode="edit"
          initialData={tool}
          categories={categories}
          tags={tags}
          technologies={technologies}
        />
      </div>
    </div>
  );
}
