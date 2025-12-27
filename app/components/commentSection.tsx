"use client";

import { useState } from "react";
import { Button } from "@/app/components/Button";
import { createComment } from "@/app/lib/api/comment";
import { createSignature } from "@/app/lib/api/signature";

type Mode = "idle" | "sign" | "create";

type Props = {
  postId: string;
  onCommentCreated?: () => void;
};

export function CommentSection({ postId, onCommentCreated }: Props) {
  const [mode, setMode] = useState<Mode>("idle");

  const [content, setContent] = useState("");
  const [signatureName, setSignatureName] = useState("");
  const [signaturePassword, setSignaturePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreateSignature() {
    setError(null);

    if (signaturePassword !== confirmPassword) {
      setError("As senhas não conferem");
      return;
    }

    try {
      setLoading(true);

      await createSignature({
        name: signatureName,
        password: signaturePassword,
      });

      setMode("sign");
    } catch (err: any) {
      setError(err.message ?? "Erro ao criar assinatura");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateComment() {
    setError(null);

    try {
      setLoading(true);

      await createComment(postId, {
        content,
        signatureName,
        signaturePassword,
      });

      setContent("");
      setSignaturePassword("");
      setMode("idle");

      onCommentCreated?.();
    } catch (err: any) {
      setError(err.message ?? "Erro ao enviar comentário");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-12 border-t pt-6 flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Comentário</h2>

      <textarea
        className="border rounded p-3 min-h-30"
        placeholder="Escreva seu comentário..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {mode === "idle" && (
        <Button onClick={() => setMode("sign")}>Assinar comentário</Button>
      )}

      {mode === "sign" && (
        <>
          <input
            className="border rounded p-2"
            placeholder="Assinatura"
            value={signatureName}
            onChange={(e) => setSignatureName(e.target.value)}
          />

          <input
            type="password"
            className="border rounded p-2"
            placeholder="Senha"
            value={signaturePassword}
            onChange={(e) => setSignaturePassword(e.target.value)}
          />

          <div className="flex gap-3">
            <Button onClick={handleCreateComment} disabled={loading}>
              Enviar
            </Button>

            <button
              onClick={() => setMode("create")}
              className="text-sm underline"
            >
              Criar assinatura
            </button>
          </div>
        </>
      )}

      {mode === "create" && (
        <>
          <input
            className="border rounded p-2"
            placeholder="Nome da assinatura"
            value={signatureName}
            onChange={(e) => setSignatureName(e.target.value)}
          />

          <input
            type="password"
            className="border rounded p-2"
            placeholder="Senha"
            value={signaturePassword}
            onChange={(e) => setSignaturePassword(e.target.value)}
          />

          <input
            type="password"
            className="border rounded p-2"
            placeholder="Confirmar senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className="flex gap-3">
            <Button onClick={handleCreateSignature} disabled={loading}>
              Criar
            </Button>

            <button
              onClick={() => setMode("sign")}
              className="text-sm underline"
            >
              Já tenho assinatura
            </button>
          </div>
        </>
      )}

      {error && <p className="text-red-600 text-sm">{error}</p>}
    </section>
  );
}
