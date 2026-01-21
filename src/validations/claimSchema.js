import { z } from "zod";

export const claimSchema = z.object({
  sinisterType: z.string().min(1, "Type de sinistre requis"),
  cause: z.string().min(1, "Cause requise"),
  hospitalizationStartDate: z.string().optional(),
  hospitalizationEndDate: z.string().optional(),
  file: z
    .instanceof(File)
    .optional(),
});