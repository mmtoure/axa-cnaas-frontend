import { z } from "zod";

const baseSchema = {
  sinisterType: z.string().min(1, "Type requis"),
};

export const claimSchema = z.discriminatedUnion("sinisterType", [
  z.object({
    ...baseSchema,
    sinisterType: z.literal("HOSPICASH"),
    hospitalizationStartDate: z.string().min(1),
    hospitalizationEndDate: z.string().min(1),
  }),

  z.object({
    ...baseSchema,
    sinisterType: z.literal("INVALIDITE"),
     motif: z.string().min(3),
     compensationAmount: z.number().min(10000, "Minimum 10000").max(350000, "Maximum 350000")
  }),

  z.object({
    ...baseSchema,
    sinisterType: z.literal("CAPITAL_FUNERAIRE"),
    motif: z.string().min(3),
  }),
]);