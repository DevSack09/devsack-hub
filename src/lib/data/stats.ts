import { prisma } from "@/lib/prisma";

export async function getToolStats() {
  const [total, active, featured] = await Promise.all([
    prisma.tool.count(),
    prisma.tool.count({ where: { status: "ACTIVE" } }),
    prisma.tool.count({ where: { isFeatured: true } }),
  ]);

  return { total, active, featured };
}
