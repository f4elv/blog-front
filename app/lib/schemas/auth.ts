import { z } from "zod";

export const writerLoginSchema = z.object({
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});

export type WriterLoginInput = z.infer<typeof writerLoginSchema>;
