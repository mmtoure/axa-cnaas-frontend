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
    .min(1, "Partenaire requis")
    .transform((val) =>Number(val)),
  roleName: z.enum(["MANAGER", "USER"]),
});