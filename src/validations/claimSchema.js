import { z } from "zod";

const baseSchema = {
  sinisterType: z.string().min(1, "Type requis"),
};

export const claimSchema = z.discriminatedUnion("sinisterType", [
  z.object({
    ...baseSchema,
    sinisterType: z.literal("HOSPICASH"),
    hospitalizationStartDate: z.string().min(1, "Date début hospitalisation obligatoire"),
    hospitalizationEndDate: z.string().min(1, "Date début hospitalisation obligatoire"),
    motif: z.string().min(3, "Motif du sinistre est obligatoire"),
  }),

  z.object({
    ...baseSchema,
    sinisterType: z.literal("INVALIDITE"),
     motif: z.string().min(3, "Motif du sinistre est obligatoire"),
  }),

  z.object({
    ...baseSchema,
    sinisterType: z.literal("CAPITAL_FUNERAIRE"),
    motif: z.string().min(3, "Motif du sinistre est obligatoire"),
  }),
]);