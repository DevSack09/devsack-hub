import { z } from "zod";

export const technologySchema = z.object({
  name: z.string().min(2, "El nombre es muy corto").max(40),
});

export type TechnologyInput = z.infer<typeof technologySchema>;
