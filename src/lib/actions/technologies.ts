"use server";

import { prisma } from "@/lib/prisma";
import { technologySchema } from "@/lib/validations/technology.schema";
import { createCatalogEntry, updateCatalogEntry, deleteCatalogEntry } from "@/lib/actions/catalog-helpers";

const paths = ["/admin/tecnologias", "/"];

export async function createTechnology(_prevState: string | undefined, formData: FormData) {
  return createCatalogEntry(prisma.technology, technologySchema, formData, paths);
}

export async function updateTechnology(
  id: string,
  _prevState: string | undefined,
  formData: FormData
) {
  return updateCatalogEntry(prisma.technology, id, technologySchema, formData, paths);
}

export async function deleteTechnology(id: string) {
  return deleteCatalogEntry(prisma.technology, id, paths, "No se pudo eliminar la tecnología.");
}
