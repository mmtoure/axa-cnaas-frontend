import { z } from "zod";

export const groupSchema = z.object({
  firstName: z.string().min(2, "Prénom requis"),
  lastName: z.string().min(2, "Nom requis"),
  dateOfBirth: z.string().min(1, "Date de naissance requise"),
  phoneNumber: z.string().min(9, "Téléphone invalide"),
  name: z.string().min(2, "Nom du groupement requis"),
  file: z
    .any()
    .or(z.instanceof(File)),
  regionId: z.string().nullable(),

});