import { z } from "zod";

export const userSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "Prénom requis (min 2 caractères)"),

  lastName: z
    .string()
    .trim()
    .min(2, "Nom requis (min 2 caractères)"),

  phoneNumber: z
    .string()
    .regex(
      /^(77|78|70|76|75)[0-9]{7}$/,
      "Numéro de téléphone invalide (ex: 77XXXXXXX)"
    ),

  email: z
    .email("Email invalide"),

  partnerId: z
    .string()
    .nullable()
    .transform((val) => {
      if (!val) return null;
      const num = Number(val);
      return isNaN(num) ? null : num;
    }),
  zoneId: z
    .string()
    .nullable()
    .transform((val) => {
      if (!val) return null;
      const num = Number(val);
      return isNaN(num) ? null : num;
    }),

  agenceId: z
    .string()
    .nullable()
    .transform((val) => {
      if (!val) return null;
      const num = Number(val);
      return isNaN(num) ? null : num;
    }),

  roleName: z.enum(["ADMIN", "MANAGER", "USER"]),

  networkId: z
    .string()
    .nullable()
    .transform((val) => {
      if (!val) return null;
      const num = Number(val);
      return isNaN(num) ? null : num;
    }),

  regionIds: z.array(z.number()).optional(),
}).refine((data) => {
  if (data.roleName === "USER") {
    return data.regionIds && data.regionIds.length > 0;
  }
  return true;
}, {
  message: "Sélectionnez au moins une région",
  path: ["regionIds"],
});
