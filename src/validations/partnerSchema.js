import { z } from "zod";

export const partnerSchema = z.object({
  name: z.string().min(2, "Nom requis"),
  code: z.string().min(2, "Code requis"),
  email: z.email().optional(),
  phoneNumber: z.string().optional()

});