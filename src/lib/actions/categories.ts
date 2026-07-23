"use server";

import { prisma } from "@/lib/prisma";
import { categorySchema } from "@/lib/validations/category.schema";
import { createCatalogEntry, updateCatalogEntry, deleteCatalogEntry } from "@/lib/actions/catalog-helpers";

const paths = ["/admin/categorias", "/"];

export async function createCategory(_prevState: string | undefined, formData: FormData) {
  return createCatalogEntry(prisma.category, categorySchema, formData, paths);
}

export async function updateCategory(
  id: string,
  _prevState: string | undefined,
  formData: FormData
) {
  return updateCatalogEntry(prisma.category, id, categorySchema, formData, paths);
}

export async function deleteCategory(id: string) {
  return deleteCatalogEntry(
    prisma.category,
    id,
    paths,
    "No se puede eliminar: hay herramientas usando esta categoría."
  );
}
