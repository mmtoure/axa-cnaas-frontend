import { z } from "zod";

export const partnerPricingSchema = z.object({
  category: z.string().optional(),
  plafondNuitsParAn: z.number(),
  accessoryCost: z.number(),
  tax: z.number(),
  montantPrime: z.number(),
  capitalMAX: z.number(),
  montantParNuit: z.number(),

});

 