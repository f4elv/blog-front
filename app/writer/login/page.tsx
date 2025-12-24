"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ZodError } from "zod";
import { writerLogin } from "../../lib/api/auth";
import { Button } from "../../components/Button";

export default function writerLoginPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setError(null);
      setLoading(true);

      await writerLogin({ password });

      router.push("/writer/dashboard");
    } catch (err) {
      if (err instanceof ZodError) {
        setError(err.issues[0].message);
        return;
      }
      if (err instanceof Error) {
        setError(err.message);
        return;
      }

      setError("Erro inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      action={handleLogin}
      className="max-w-2xl mx-auto mt-24 p-6 rounded-md border border-red-800 flex flex-col gap-4 items-center"
    >
      <h1 className="text-4xl font-extrabold mb-4">Só a boa mano</h1>

      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
        className="w-full px-4 py-2 border border-red-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-center"
      />

      <Button variant="primary" disabled={loading} className="w-full">
        {loading ? "Entrando..." : "Entrar"}
      </Button>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
    </form>
  );
}
