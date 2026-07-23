"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/auth";
import { toolSchema } from "@/lib/validations/tool.schema";
import { isSlugTaken } from "@/lib/data/tools";
import { slugify } from "@/lib/utils";

function parseToolFormData(formData: FormData) {
  const rawImageUrl = formData.get("imageUrl");

  return {
    name: formData.get("name"),
    description: formData.get("description"),
    url: formData.get("url"),
    imageUrl: rawImageUrl ? rawImageUrl : null,
    categoryId: formData.get("categoryId"),
    tagIds: formData.getAll("tagIds"),
    technologyIds: formData.getAll("technologyIds"),
    recommendationLevel: Number(formData.get("recommendationLevel")),
    status: formData.get("status"),
    isFeatured: formData.get("isFeatured") === "true",
  };
}

async function ensureUniqueSlug(base: string, excludeId?: string) {
  let slug = base;
  let suffix = 2;

  while (await isSlugTaken(slug, excludeId)) {
    slug = `${base}-${suffix}`;
    suffix += 1;
  }

  return slug;
}

function revalidateToolPaths() {
  revalidatePath("/admin/herramientas");
  revalidatePath("/");
}

export async function createTool(_prevState: string | undefined, formData: FormData) {
  await requireSession();

  const parsed = toolSchema.safeParse(parseToolFormData(formData));
  if (!parsed.success) {
    return parsed.error.issues[0]?.message ?? "Revisa los datos ingresados.";
  }

  const { tagIds, technologyIds, categoryId, ...data } = parsed.data;
  const slug = await ensureUniqueSlug(slugify(data.name));

  await prisma.tool.create({
    data: {
      ...data,
      slug,
      category: { connect: { id: categoryId } },
      tags: { connect: tagIds.map((id) => ({ id })) },
      technologies: { connect: technologyIds.map((id) => ({ id })) },
    },
  });

  revalidateToolPaths();
  redirect("/admin/herramientas");
}

export async function updateTool(
  id: string,
  _prevState: string | undefined,
  formData: FormData
) {
  await requireSession();

  const parsed = toolSchema.safeParse(parseToolFormData(formData));
  if (!parsed.success) {
    return parsed.error.issues[0]?.message ?? "Revisa los datos ingresados.";
  }

  const { tagIds, technologyIds, categoryId, ...data } = parsed.data;

  await prisma.tool.update({
    where: { id },
    data: {
      ...data,
      category: { connect: { id: categoryId } },
      tags: { set: tagIds.map((tagId) => ({ id: tagId })) },
      technologies: { set: technologyIds.map((techId) => ({ id: techId })) },
    },
  });

  revalidateToolPaths();
  redirect("/admin/herramientas");
}

export async function deleteTool(id: string) {
  await requireSession();
  await prisma.tool.delete({ where: { id } });
  revalidateToolPaths();
}

export async function toggleToolStatus(id: string, nextStatus: "ACTIVE" | "INACTIVE") {
  await requireSession();
  await prisma.tool.update({ where: { id }, data: { status: nextStatus } });
  revalidateToolPaths();
}

export async function toggleFeatured(id: string, nextValue: boolean) {
  await requireSession();
  await prisma.tool.update({ where: { id }, data: { isFeatured: nextValue } });
  revalidateToolPaths();
}

// Acción pública (sin requireSession): cualquier visitante la dispara al
// hacer click en "Visitar" desde la galería. No revalida rutas a propósito,
// no es visualmente crítico que el contador se refresque al instante.
export async function incrementToolClicks(id: string) {
  await prisma.tool.update({ where: { id }, data: { clicksCount: { increment: 1 } } });
}
