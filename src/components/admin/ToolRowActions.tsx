"use client";

import { useTransition } from "react";
import Link from "next/link";
import { Ban, CheckCircle2, Pencil, Star, Trash2 } from "lucide-react";
import { deleteTool, toggleFeatured, toggleToolStatus } from "@/lib/actions/tools";
import type { ToolStatus } from "@/types";

type ToolRowActionsProps = {
  id: string;
  status: ToolStatus;
  isFeatured: boolean;
};

export function ToolRowActions({ id, status, isFeatured }: ToolRowActionsProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("¿Eliminar esta herramienta? Esta acción no se puede deshacer.")) return;
    startTransition(() => deleteTool(id));
  };

  return (
    <div className="flex items-center gap-1">
      <Link
        href={`/admin/herramientas/${id}/editar`}
        aria-label="Editar"
        className="rounded-lg p-2 text-foreground/60 transition-colors hover:bg-border/40 hover:text-foreground"
      >
        <Pencil size={16} />
      </Link>

      <button
        type="button"
        disabled={isPending}
        onClick={() => startTransition(() => toggleFeatured(id, !isFeatured))}
        aria-label={isFeatured ? "Quitar de destacadas" : "Marcar como destacada"}
        aria-pressed={isFeatured}
        className={`rounded-lg p-2 transition-colors hover:bg-border/40 ${
          isFeatured ? "text-dev-green" : "text-foreground/60 hover:text-foreground"
        }`}
      >
        <Star size={16} fill={isFeatured ? "currentColor" : "none"} />
      </button>

      <button
        type="button"
        disabled={isPending}
        onClick={() =>
          startTransition(() => toggleToolStatus(id, status === "ACTIVE" ? "INACTIVE" : "ACTIVE"))
        }
        aria-label={status === "ACTIVE" ? "Desactivar" : "Activar"}
        className="rounded-lg p-2 text-foreground/60 transition-colors hover:bg-border/40 hover:text-foreground"
      >
        {status === "ACTIVE" ? <Ban size={16} /> : <CheckCircle2 size={16} />}
      </button>

      <button
        type="button"
        disabled={isPending}
        onClick={handleDelete}
        aria-label="Eliminar"
        className="rounded-lg p-2 text-foreground/60 transition-colors hover:bg-red-500/10 hover:text-red-400"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
