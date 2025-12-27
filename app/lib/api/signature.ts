import { fetcher } from "../fetcher";
import { signatureSchema } from "../schemas/signature";

export async function createSignature(input: unknown) {
  const parsed = signatureSchema.safeParse(input);

  if (!parsed.success) throw parsed.error;

  const response = await fetcher("/signature", {
    method: "POST",
    body: JSON.stringify(parsed.data),
  });

  return response;
}
