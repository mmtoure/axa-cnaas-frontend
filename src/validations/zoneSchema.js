import { z } from "zod";

export const zoneSchema = z.object({
  name: z.string().min(2, "Nom requis"),
  chefZoneId: z 
  .string()
  .nullable()
  .transform((val) => {
    if (!val) return null;
    const num = Number(val);
    return isNaN(num) ? null : num;
  }),
});