"use server";

import { prisma } from "@/lib/prisma";
import { tagSchema } from "@/lib/validations/tag.schema";
import { createCatalogEntry, updateCatalogEntry, deleteCatalogEntry } from "@/lib/actions/catalog-helpers";

const paths = ["/admin/etiquetas", "/"];

export async function createTag(_prevState: string | undefined, formData: FormData) {
  return createCatalogEntry(prisma.tag, tagSchema, formData, paths);
}

export async function updateTag(id: string, _prevState: string | undefined, formData: FormData) {
  return updateCatalogEntry(prisma.tag, id, tagSchema, formData, paths);
}

export async function deleteTag(id: string) {
  return deleteCatalogEntry(prisma.tag, id, paths, "No se pudo eliminar la etiqueta.");
}
