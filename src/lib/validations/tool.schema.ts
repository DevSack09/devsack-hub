import { z } from "zod";

export const toolSchema = z.object({
  name: z.string().min(2, "El nombre es muy corto").max(80),
  description: z.string().min(10, "La descripción es muy corta").max(500),
  url: z.string().url("Debe ser una URL válida"),
  imageUrl: z.string().url().optional().nullable(),
  categoryId: z.string().min(1, "Selecciona una categoría"),
  tagIds: z.array(z.string()).default([]),
  technologyIds: z.array(z.string()).default([]),
  recommendationLevel: z.number().int().min(1).max(5).default(3),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
  isFeatured: z.boolean().default(false),
});

export type ToolInput = z.infer<typeof toolSchema>;
