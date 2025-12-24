"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPostById, deletePost } from "@/app/lib/api/post";
import { tokenStorage } from "@/app/lib/helpers/token";
import { Button } from "@/app/components/Button";
import hljs from "highlight.js";
import "@/app/components/tiptap/style.css"; // seu CSS

type Comment = {
  id: string;
  content: string;
  createdAt: string;
  signature: string;
};

type Post = {
  id: string;
  title: string;
  content: string; // HTML
  createdAt: string;
  comments: Comment[];
};

export default function PostPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const isWriter = Boolean(tokenStorage.get());

  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    getPostById(id).then(setPost);
  }, [id]);

  // Aplica syntax highlighting no código
  useEffect(() => {
    const blocks = document.querySelectorAll("pre code");
    blocks.forEach((block) => hljs.highlightElement(block as HTMLElement));
  }, [post]);

  if (!post) return <p>Carregando...</p>;

  return (
    <article className="max-w-3xl mx-auto py-10 flex flex-col gap-6">
      {isWriter && (
        <div className="flex justify-end gap-2">
          <Button onClick={() => router.push(`/writer/edit/${id}`)}>
            Editar
          </Button>

          <Button
            variant="primary"
            onClick={async () => {
              await deletePost(id);
              router.push("/posts");
            }}
          >
            Excluir
          </Button>
        </div>
      )}

      <h1 className="text-4xl font-bold">{post.title}</h1>

      <div
        className="tiptap"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Opcional: exibir comentários */}
      {post.comments.length > 0 && (
        <section className="mt-10 border-t pt-4">
          <h2 className="text-2xl font-semibold mb-4">Comentários</h2>
          {post.comments.map((comment) => (
            <div key={comment.id} className="mb-4">
              <p className="text-sm text-neutral-500">
                {comment.signature} disse:
              </p>
              <p>{comment.content}</p>
              <p className="text-xs text-neutral-400">
                {new Date(comment.createdAt).toLocaleDateString("pt-BR")}
              </p>
            </div>
          ))}
        </section>
      )}
    </article>
  );
}
