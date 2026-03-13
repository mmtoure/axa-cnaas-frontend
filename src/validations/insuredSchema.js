import { z } from "zod";

export const insuredSchema = z.object({
  firstName: z.string().min(2, "Prénom requis"),
  lastName: z.string().min(2, "Nom requis"),
  dateOfBirth: z.string().min(1, "Date de naissance requise"),
  phoneNumber: z.string().min(9, "Téléphone invalide"),
  category: z.string().nullable(),
  

  beneficiary: z.object({
    firstName: z.string().min(2, "Prénom bénéficiaire requis"),
    lastName: z.string().min(2, "Nom bénéficiaire requis"),
    dateOfBirth: z.string().min(1, "Date de naissance bénéficiaire requise"),
    phoneNumber: z.string().min(9, "Téléphone bénéficiaire invalide"),
    
  }),
});