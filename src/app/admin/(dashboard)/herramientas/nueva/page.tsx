import { getCategories } from "@/lib/data/categories";
import { getTags } from "@/lib/data/tags";
import { getTechnologies } from "@/lib/data/technologies";
import { ToolForm } from "@/components/admin/ToolForm";

export default async function NuevaHerramientaPage() {
  const [categories, tags, technologies] = await Promise.all([
    getCategories(),
    getTags(),
    getTechnologies(),
  ]);

  return (
    <div>
      <h1 className="font-primary text-3xl font-bold text-foreground">Nueva herramienta</h1>
      <div className="mt-6">
        <ToolForm mode="create" categories={categories} tags={tags} technologies={technologies} />
      </div>
    </div>
  );
}
