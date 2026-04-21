import { z } from "zod";

export const agenceSchema = z.object({
  name: z.string().min(2, "Nom requis"),
  zoneId: z.string().min(1, "Zone requise").transform((val) => Number(val)),
  
  chefAgenceId: z
  .string()
  .nullable()
  .transform((val) => {
    if (!val) return null;
    const num = Number(val);
    return isNaN(num) ? null : num;
  }),

});