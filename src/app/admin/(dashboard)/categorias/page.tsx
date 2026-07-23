import { getCategories } from "@/lib/data/categories";
import { createCategory, updateCategory, deleteCategory } from "@/lib/actions/categories";
import { CatalogManager } from "@/components/admin/CatalogManager";

export default async function AdminCategoriasPage() {
  const categories = await getCategories();

  return (
    <div>
      <h1 className="font-primary text-3xl font-bold text-foreground">Categorías</h1>
      <div className="mt-6">
        <CatalogManager
          items={categories}
          createAction={createCategory}
          updateAction={updateCategory}
          deleteAction={deleteCategory}
          emptyLabel="Todavía no hay categorías."
        />
      </div>
    </div>
  );
}
