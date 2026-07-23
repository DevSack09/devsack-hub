"use client";

import { useActionState, useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

type CatalogItem = { id: string; name: string; slug: string };

type CatalogAction = (prevState: string | undefined, formData: FormData) => Promise<string | undefined>;
type CatalogUpdateAction = (
  id: string,
  prevState: string | undefined,
  formData: FormData
) => Promise<string | undefined>;
type CatalogDeleteAction = (id: string) => Promise<{ error?: string }>;

type CatalogManagerProps = {
  items: CatalogItem[];
  createAction: CatalogAction;
  updateAction: CatalogUpdateAction;
  deleteAction: CatalogDeleteAction;
  emptyLabel: string;
};

export function CatalogManager({
  items,
  createAction,
  updateAction,
  deleteAction,
  emptyLabel,
}: CatalogManagerProps) {
  const [createError, createFormAction, isCreating] = useActionState(createAction, undefined);

  return (
    <div className="max-w-xl space-y-6">
      <form key={items.length} action={createFormAction} className="flex items-end gap-3">
        <div className="flex-1">
          <Input id="name" name="name" label="Nombre" required />
        </div>
        <Button type="submit" disabled={isCreating} className="flex items-center gap-2">
          {isCreating && <Loader2 size={16} className="animate-spin" />}
          Agregar
        </Button>
      </form>

      {createError && (
        <motion.p
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-sm text-red-400"
        >
          {createError}
        </motion.p>
      )}

      <ul className="divide-y divide-border rounded-xl border border-border">
        {items.length === 0 && <li className="p-4 font-secondary text-sm text-foreground/60">{emptyLabel}</li>}
        {items.map((item) => (
          <CatalogRow
            key={item.id}
            item={item}
            updateAction={updateAction}
            deleteAction={deleteAction}
          />
        ))}
      </ul>
    </div>
  );
}

function CatalogRow({
  item,
  updateAction,
  deleteAction,
}: {
  item: CatalogItem;
  updateAction: CatalogUpdateAction;
  deleteAction: CatalogDeleteAction;
}) {
  const boundUpdate = updateAction.bind(null, item.id);
  const [updateError, formAction, isSaving] = useActionState(boundUpdate, undefined);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, startDeleteTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("¿Eliminar? Esta acción no se puede deshacer.")) return;
    startDeleteTransition(async () => {
      const result = await deleteAction(item.id);
      setDeleteError(result.error ?? null);
    });
  };

  return (
    <li className="flex flex-col gap-2 p-3">
      <form action={formAction} className="flex items-center gap-2">
        <input
          key={item.name}
          name="name"
          defaultValue={item.name}
          className="flex-1 rounded-lg border border-border bg-background/50 px-3 py-1.5 font-secondary text-sm text-foreground outline-none transition-colors focus:border-dev-blue focus-visible:ring-2 focus-visible:ring-dev-blue/40"
        />
        <button
          type="submit"
          disabled={isSaving}
          aria-label="Guardar"
          className="rounded-lg p-2 text-foreground/60 transition-colors hover:bg-border/40 hover:text-foreground"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          aria-label="Eliminar"
          className="rounded-lg p-2 text-foreground/60 transition-colors hover:bg-red-500/10 hover:text-red-400"
        >
          <Trash2 size={16} />
        </button>
      </form>
      {updateError && <p className="text-sm text-red-400">{updateError}</p>}
      {deleteError && <p className="text-sm text-red-400">{deleteError}</p>}
    </li>
  );
}
