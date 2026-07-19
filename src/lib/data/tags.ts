import { prisma } from "@/lib/prisma";

export function getTags() {
  return prisma.tag.findMany({ orderBy: { name: "asc" } });
}

export function getTagBySlug(slug: string) {
  return prisma.tag.findUnique({ where: { slug } });
}
