import { z } from "zod";

export const tagSchema = z.object({
  name: z.string().min(2, "El nombre es muy corto").max(40),
});

export type TagInput = z.infer<typeof tagSchema>;
