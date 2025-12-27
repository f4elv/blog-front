import { z } from "zod";

export const signatureSchema = z.object({
  name: z.string().min(1).max(30),
  password: z.string().min(8),
});
