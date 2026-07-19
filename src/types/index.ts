import type { Tool, Category, Tag, Technology, ToolStatus } from "@/generated/prisma/client";

export type { Tool, Category, Tag, Technology, ToolStatus };

export type ToolWithRelations = Tool & {
  category: Category;
  tags: Tag[];
  technologies: Technology[];
};
