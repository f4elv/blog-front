import { fetcher } from "../fetcher";
import { tokenStorage } from "../helpers/token";
import { writerLoginSchema } from "../schemas/auth";

type LoginResponse = {
  access_token: string;
  message: string;
};

export async function writerLogin(input: { password: string }) {
  const parsed = writerLoginSchema.safeParse(input);

  if (!parsed.success) {
    throw parsed.error;
  }

  const response: LoginResponse = await fetcher("/auth/login", {
    method: "POST",
    body: JSON.stringify(parsed.data),
  });

  tokenStorage.set(response.access_token);

  return response;
}
