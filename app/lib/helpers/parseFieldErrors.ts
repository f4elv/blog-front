import { ZodError } from "zod";

export type FieldErrors = {
  content?: string;
  signatureName?: string;
  signaturePassword?: string;
  confirmPassword?: string;
};

export function parseFieldErrors(error: unknown): FieldErrors {
  const errors: FieldErrors = {};

  // 1️⃣ ZodError (frontend)
  if (error instanceof ZodError) {
    for (const issue of error.issues) {
      const field = issue.path[0];

      if (field === "content") {
        errors.content = "O comentário não pode estar vazio";
      }

      if (field === "signatureName") {
        errors.signatureName = "Preencha a assinatura";
      }

      if (field === "signaturePassword") {
        errors.signaturePassword = "A senha deve ter no mínimo 8 caracteres";
      }
    }

    return errors;
  }

  // 2️⃣ Erro HTTP do backend (Nest)
  if (typeof error === "object" && error !== null) {
    const anyError = error as any;

    const message = anyError?.response?.data?.message ?? anyError?.message;

    if (typeof message === "string") {
      if (message.includes("Assinatura")) {
        errors.signatureName = message;
      }

      if (message.includes("Senha")) {
        errors.signaturePassword = message;
      }

      return errors;
    }
  }

  // 3️⃣ fallback (sempre retorna)
  return errors;
}
