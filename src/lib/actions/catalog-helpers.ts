import { revalidatePath } from "next/cache";
import type { z } from "zod";
import { requireSession } from "@/lib/auth";
import { slugify } from "@/lib/utils";

type CatalogRecord = { id: string; name: string; slug: string };

type CatalogDelegate = {
  findUnique(args: { where: { slug: string } }): Promise<CatalogRecord | null>;
  create(args: { data: { name: string; slug: string } }): Promise<CatalogRecord>;
  update(args: { where: { id: string }; data: { name: string } }): Promise<CatalogRecord>;
  delete(args: { where: { id: string } }): Promise<CatalogRecord>;
};

async function ensureUniqueSlug(delegate: CatalogDelegate, base: string) {
  let slug = base;
  let suffix = 2;

  while (await delegate.findUnique({ where: { slug } })) {
    slug = `${base}-${suffix}`;
    suffix += 1;
  }

  return slug;
}

function revalidateAll(paths: string[]) {
  for (const path of paths) revalidatePath(path);
}

export async function createCatalogEntry(
  delegate: CatalogDelegate,
  schema: z.ZodType<{ name: string }>,
  formData: FormData,
  revalidatePaths: string[]
) {
  await requireSession();

  const parsed = schema.safeParse({ name: formData.get("name") });
  if (!parsed.success) {
    return parsed.error.issues[0]?.message ?? "Revisa el nombre ingresado.";
  }

  const slug = await ensureUniqueSlug(delegate, slugify(parsed.data.name));
  await delegate.create({ data: { name: parsed.data.name, slug } });
  revalidateAll(revalidatePaths);
  return undefined;
}

export async function updateCatalogEntry(
  delegate: CatalogDelegate,
  id: string,
  schema: z.ZodType<{ name: string }>,
  formData: FormData,
  revalidatePaths: string[]
) {
  await requireSession();

  const parsed = schema.safeParse({ name: formData.get("name") });
  if (!parsed.success) {
    return parsed.error.issues[0]?.message ?? "Revisa el nombre ingresado.";
  }

  await delegate.update({ where: { id }, data: { name: parsed.data.name } });
  revalidateAll(revalidatePaths);
  return undefined;
}

export async function deleteCatalogEntry(
  delegate: CatalogDelegate,
  id: string,
  revalidatePaths: string[],
  conflictMessage: string
) {
  await requireSession();

  try {
    await delegate.delete({ where: { id } });
    revalidateAll(revalidatePaths);
    return {};
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "P2003") {
      return { error: conflictMessage };
    }
    throw error;
  }
}
