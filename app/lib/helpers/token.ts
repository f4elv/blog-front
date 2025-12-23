const TOKEN = "access_token";

export const tokenStorage = {
  get: () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN);
  },
  set: (token: string) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(TOKEN, token);
  },
  remove: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN);
  },
};
