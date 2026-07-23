"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import { createTool, updateTool } from "@/lib/actions/tools";
import { UploadButton } from "@/lib/uploadthing";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { Category, Tag, Technology, ToolWithRelations } from "@/types";

type ToolFormProps = {
  mode: "create" | "edit";
  initialData?: ToolWithRelations;
  categories: Category[];
  tags: Tag[];
  technologies: Technology[];
};

export function ToolForm({ mode, initialData, categories, tags, technologies }: ToolFormProps) {
  const action = mode === "edit" && initialData ? updateTool.bind(null, initialData.id) : createTool;
  const [errorMessage, formAction, isPending] = useActionState(action, undefined);
  const [imageUrl, setImageUrl] = useState<string | null>(initialData?.imageUrl ?? null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      <input type="hidden" name="imageUrl" value={imageUrl ?? ""} />

      <Input
        id="name"
        name="name"
        label="Nombre"
        defaultValue={initialData?.name}
        required
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="font-secondary text-sm font-medium text-foreground/80">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={initialData?.description}
          required
          className="rounded-lg border border-border bg-background/50 px-4 py-2.5 font-secondary text-sm text-foreground outline-none transition-colors focus:border-dev-blue focus-visible:ring-2 focus-visible:ring-dev-blue/40"
        />
      </div>

      <Input
        id="url"
        name="url"
        type="url"
        label="URL"
        defaultValue={initialData?.url}
        placeholder="https://"
        required
      />

      <div className="flex flex-col gap-2">
        <span className="font-secondary text-sm font-medium text-foreground/80">Imagen / preview</span>
        {imageUrl && (
          <div className="relative h-32 w-52 overflow-hidden rounded-lg border border-border">
            <Image src={imageUrl} alt="" fill className="object-cover" unoptimized />
            <button
              type="button"
              onClick={() => setImageUrl(null)}
              aria-label="Quitar imagen"
              className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white hover:bg-black/80"
            >
              <X size={14} />
            </button>
          </div>
        )}
        <UploadButton
          endpoint="toolImage"
          onClientUploadComplete={(res) => {
            setUploadError(null);
            setImageUrl(res[0]?.ufsUrl ?? null);
          }}
          onUploadError={(error) => setUploadError(error.message)}
        />
        {uploadError && <p className="text-sm text-red-400">{uploadError}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="categoryId" className="font-secondary text-sm font-medium text-foreground/80">
          Categoría
        </label>
        <select
          id="categoryId"
          name="categoryId"
          defaultValue={initialData?.categoryId}
          required
          className="rounded-lg border border-border bg-background/50 px-4 py-2.5 font-secondary text-sm text-foreground outline-none transition-colors focus:border-dev-blue focus-visible:ring-2 focus-visible:ring-dev-blue/40"
        >
          <option value="" disabled>
            Selecciona una categoría
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="font-secondary text-sm font-medium text-foreground/80">Etiquetas</legend>
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <label key={tag.id} className="flex items-center gap-1.5 font-secondary text-sm text-foreground/70">
              <input
                type="checkbox"
                name="tagIds"
                value={tag.id}
                defaultChecked={initialData?.tags.some((t) => t.id === tag.id)}
                className="accent-dev-blue"
              />
              {tag.name}
            </label>
          ))}
          {tags.length === 0 && <p className="text-sm text-foreground/50">Todavía no hay etiquetas.</p>}
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-2">
        <legend className="font-secondary text-sm font-medium text-foreground/80">Tecnologías</legend>
        <div className="flex flex-wrap gap-3">
          {technologies.map((technology) => (
            <label
              key={technology.id}
              className="flex items-center gap-1.5 font-secondary text-sm text-foreground/70"
            >
              <input
                type="checkbox"
                name="technologyIds"
                value={technology.id}
                defaultChecked={initialData?.technologies.some((t) => t.id === technology.id)}
                className="accent-dev-green"
              />
              {technology.name}
            </label>
          ))}
          {technologies.length === 0 && (
            <p className="text-sm text-foreground/50">Todavía no hay tecnologías.</p>
          )}
        </div>
      </fieldset>

      <div className="flex gap-6">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="recommendationLevel" className="font-secondary text-sm font-medium text-foreground/80">
            Nivel de recomendación
          </label>
          <select
            id="recommendationLevel"
            name="recommendationLevel"
            defaultValue={initialData?.recommendationLevel ?? 3}
            className="rounded-lg border border-border bg-background/50 px-4 py-2.5 font-secondary text-sm text-foreground outline-none transition-colors focus:border-dev-blue focus-visible:ring-2 focus-visible:ring-dev-blue/40"
          >
            {[1, 2, 3, 4, 5].map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="status" className="font-secondary text-sm font-medium text-foreground/80">
            Estado
          </label>
          <select
            id="status"
            name="status"
            defaultValue={initialData?.status ?? "ACTIVE"}
            className="rounded-lg border border-border bg-background/50 px-4 py-2.5 font-secondary text-sm text-foreground outline-none transition-colors focus:border-dev-blue focus-visible:ring-2 focus-visible:ring-dev-blue/40"
          >
            <option value="ACTIVE">Activo</option>
            <option value="INACTIVE">Inactivo</option>
          </select>
        </div>

        <label className="flex items-center gap-2 self-end pb-2.5 font-secondary text-sm text-foreground/80">
          <input
            type="checkbox"
            name="isFeatured"
            value="true"
            defaultChecked={initialData?.isFeatured}
            className="accent-dev-green"
          />
          Destacada
        </label>
      </div>

      <div aria-live="polite">
        {errorMessage && (
          <motion.p
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm text-red-400"
          >
            {errorMessage}
          </motion.p>
        )}
      </div>

      <Button type="submit" disabled={isPending} className="flex items-center justify-center gap-2">
        {isPending && <Loader2 size={16} className="animate-spin" />}
        {isPending ? "Guardando..." : mode === "create" ? "Crear herramienta" : "Guardar cambios"}
      </Button>
    </form>
  );
}
