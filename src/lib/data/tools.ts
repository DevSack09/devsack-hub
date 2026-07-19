import { prisma } from "@/lib/prisma";

export function getActiveTools() {
  return prisma.tool.findMany({
    where: { status: "ACTIVE" },
    include: { category: true, tags: true, technologies: true },
    orderBy: { createdAt: "desc" },
  });
}

export function getFeaturedTools() {
  return prisma.tool.findMany({
    where: { status: "ACTIVE", isFeatured: true },
    include: { category: true, tags: true, technologies: true },
    orderBy: { createdAt: "desc" },
  });
}

export function getRecentTools(limit = 5) {
  return prisma.tool.findMany({
    where: { status: "ACTIVE" },
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export function getToolBySlug(slug: string) {
  return prisma.tool.findUnique({
    where: { slug },
    include: { category: true, tags: true, technologies: true },
  });
}
