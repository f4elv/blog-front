import { z } from "zod";

export const commentSchema = z.object({
  content: z.string().min(1, "Comentário obrigatório"),
  signatureName: z.string().min(1, "Assinatura obrigatória"),
  signaturePassword: z.string().min(1, "Senha obrigatória"),
});

export type CommentInput = z.infer<typeof commentSchema>;
