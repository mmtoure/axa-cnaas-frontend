import { z } from "zod";

export const reseauSchema = z.object({
  name: z.string().min(2, "Nom requis"),
  managerId: z 
  .string()
  .nullable()
  .transform((val) => {
    if (!val) return null;
    const num = Number(val);
    return isNaN(num) ? null : num;
  }),

  regionId: z 
  .string()
  .nullable()
  .transform((val) => {
    if (!val) return null;
    const num = Number(val);
    return isNaN(num) ? null : num;
  }),

   regionIds: z
    .array(z.number())
    .min(1, "Veuillez sélectionner au moins une région"),
});