import * as z from "zod";

export const RdvSchema = z.object({
  daterdv: z.date(),
  userId: z.optional(z.string()),
  name: z.string().min(1, { message: "Donnez le nom du médecin" }),
  comment: z.optional(z.string()),
});
