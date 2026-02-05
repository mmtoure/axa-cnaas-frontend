import { z } from "zod";
const claimSchema = z.discriminatedUnion("sinisterType", [
  z.object({
    sinisterType: z.literal("HOSPICASH"),
    hospitalizationStartDate: z.string().min(1, "Date début obligatoire"),
    hospitalizationEndDate: z.string().min(1, "Date fin obligatoire"),
  }),
  z.object({
    sinisterType: z.literal("INVALIDITE"),
  }),
  z.object({
    sinisterType: z.literal("CAPITAL_FUNERAIRE"),
  }),
]);
export const createClaimsSchema = z.object({
  claims: z.array(claimSchema).min(1, "Sélectionne au moins un sinistre"),
});