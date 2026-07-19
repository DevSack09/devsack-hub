import { prisma } from "@/lib/prisma";

export function getTechnologies() {
  return prisma.technology.findMany({ orderBy: { name: "asc" } });
}
