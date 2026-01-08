"use client";

import { useState } from "react";
import { Button } from "@/app/components/Button";
import { createComment } from "@/app/lib/api/comment";
import { createSignature } from "@/app/lib/api/signature";
import {
  parseFieldErrors,
  FieldErrors,
} from "@/app/lib/helpers/parseFieldErrors";

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
  const [submitted, setSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function inputClass(hasError?: boolean) {
    return `
      w-full border rounded p-2 outline-none transition
      ${
        hasError
          ? "border-red-500 focus:ring-1 focus:ring-red-400"
          : "border-gray-300"
      }
    `;
  }

  async function handleCreateSignature() {
    setSubmitted(true);
    setFieldErrors({});

    if (signaturePassword !== confirmPassword) {
      setFieldErrors({
        confirmPassword: "As senhas não conferem",
      });
      return;
    }

    try {
      setLoading(true);

      await createSignature({
        name: signatureName,
        password: signaturePassword,
      });

      setSubmitted(false);
      setMode("sign");
    } catch (err) {
      setFieldErrors(parseFieldErrors(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateComment() {
    setSubmitted(true);
    setFieldErrors({});

    try {
      setLoading(true);

      await createComment(postId, {
        content,
        signatureName,
        signaturePassword,
      });

      setSubmitted(false);
      setContent("");
      setSignaturePassword("");
      setMode("idle");

      onCommentCreated?.();
    } catch (err) {
      setFieldErrors(parseFieldErrors(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-12 border-t pt-6 flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Comentário</h2>

      {/* Comentário */}
      <div>
        <textarea
          className={`
            w-full border rounded p-3 min-h-32 outline-none transition
            ${
              submitted && fieldErrors.content
                ? "border-red-500 focus:ring-1 focus:ring-red-400"
                : "border-gray-300"
            }
          `}
          placeholder="Escreva seu comentário..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {submitted && fieldErrors.content && (
          <p className="text-red-600 text-xs mt-1">{fieldErrors.content}</p>
        )}
      </div>

      {mode === "idle" && (
        <Button onClick={() => setMode("sign")}>Assinar comentário</Button>
      )}

      {mode === "sign" && (
        <>
          {/* Assinatura */}
          <div>
            <input
              className={inputClass(submitted && !!fieldErrors.signatureName)}
              placeholder="Assinatura"
              value={signatureName}
              onChange={(e) => setSignatureName(e.target.value)}
            />

            {submitted && fieldErrors.signatureName && (
              <p className="text-red-600 text-xs mt-1">
                {fieldErrors.signatureName}
              </p>
            )}
          </div>

          {/* Senha */}
          <div>
            <input
              type="password"
              className={inputClass(
                submitted && !!fieldErrors.signaturePassword
              )}
              placeholder="Senha"
              value={signaturePassword}
              onChange={(e) => setSignaturePassword(e.target.value)}
            />

            {submitted && fieldErrors.signaturePassword && (
              <p className="text-red-600 text-xs mt-1">
                {fieldErrors.signaturePassword}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <Button onClick={handleCreateComment} disabled={loading}>
              Enviar
            </Button>

            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setFieldErrors({});
                setMode("create");
              }}
              className="text-sm underline"
            >
              Criar assinatura
            </button>
          </div>
        </>
      )}

      {mode === "create" && (
        <>
          {/* Nome da assinatura */}
          <div>
            <input
              className={inputClass(submitted && !!fieldErrors.signatureName)}
              placeholder="Nome da assinatura"
              value={signatureName}
              onChange={(e) => setSignatureName(e.target.value)}
            />

            {submitted && fieldErrors.signatureName && (
              <p className="text-red-600 text-xs mt-1">
                {fieldErrors.signatureName}
              </p>
            )}
          </div>

          {/* Senha */}
          <div>
            <input
              type="password"
              className={inputClass(
                submitted && !!fieldErrors.signaturePassword
              )}
              placeholder="Senha"
              value={signaturePassword}
              onChange={(e) => setSignaturePassword(e.target.value)}
            />

            {submitted && fieldErrors.signaturePassword && (
              <p className="text-red-600 text-xs mt-1">
                {fieldErrors.signaturePassword}
              </p>
            )}
          </div>

          {/* Confirmar senha */}
          <div>
            <input
              type="password"
              className={inputClass(submitted && !!fieldErrors.confirmPassword)}
              placeholder="Confirmar senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {submitted && fieldErrors.confirmPassword && (
              <p className="text-red-600 text-xs mt-1">
                {fieldErrors.confirmPassword}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <Button onClick={handleCreateSignature} disabled={loading}>
              Criar
            </Button>

            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setFieldErrors({});
                setMode("sign");
              }}
              className="text-sm underline"
            >
              Já tenho assinatura
            </button>
          </div>
        </>
      )}
    </section>
  );
}
