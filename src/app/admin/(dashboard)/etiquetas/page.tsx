import { getTags } from "@/lib/data/tags";
import { createTag, updateTag, deleteTag } from "@/lib/actions/tags";
import { CatalogManager } from "@/components/admin/CatalogManager";

export default async function AdminEtiquetasPage() {
  const tags = await getTags();

  return (
    <div>
      <h1 className="font-primary text-3xl font-bold text-foreground">Etiquetas</h1>
      <div className="mt-6">
        <CatalogManager
          items={tags}
          createAction={createTag}
          updateAction={updateTag}
          deleteAction={deleteTag}
          emptyLabel="Todavía no hay etiquetas."
        />
      </div>
    </div>
  );
}
