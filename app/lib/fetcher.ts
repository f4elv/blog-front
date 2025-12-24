import { tokenStorage } from "./helpers/token";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type FetcherOptions = RequestInit & {
  auth?: boolean;
};

export async function fetcher(
  path: string,
  { auth = false, headers, ...options }: FetcherOptions = {}
) {
  if (!BASE_URL) {
    throw new Error("API URL não definida");
  }

  const url = `${BASE_URL}${path}`;

  const finalHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(headers as Record<string, string>),
  };

  if (auth) {
    const token = tokenStorage.get();

    if (token) {
      finalHeaders.Authorization = `Bearer ${token}`;
      console.log(token);
    }
  }

  const response = await fetch(url, {
    ...options,
    headers: finalHeaders,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message ?? `Erro ${response.status}`);
  }

  console.log(path);

  return response.json();
}
