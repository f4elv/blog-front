"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPostById, updatePost } from "@/app/lib/api/post";
import { tokenStorage } from "@/app/lib/helpers/token";
import { Button } from "@/app/components/Button";
import EditorJS from "@/app/components/tiptap/Editor";
import type { Editor } from "@tiptap/react";

type Post = {
  id: string;
  title: string;
  content: string;
};

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [editor, setEditor] = useState<Editor | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = tokenStorage.get();
    if (!token) {
      router.replace("/writer/login");
    }
  }, [router]);

  useEffect(() => {
    getPostById(id).then((data) => {
      setPost(data);
      setTitle(data.title);
    });
  }, [id]);

  useEffect(() => {
    if (editor && post) {
      editor.commands.setContent(post.content);
    }
  }, [editor, post]);

  const handleSave = async () => {
    if (!editor) return;

    try {
      setLoading(true);

      await updatePost(id, {
        title,
        content: editor.getHTML(),
      });

      router.push(`/posts/${id}`);
    } catch (err) {
      alert("Erro ao salvar o post");
    } finally {
      setLoading(false);
    }
  };

  if (!post) {
    return <p className="text-center mt-20">Carregando post...</p>;
  }

  return (
    <section className="max-w-5xl mx-auto py-10 flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-center">Editar post</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título do post"
        className="w-full px-4 py-3 text-xl border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
      />

      <EditorJS onReady={setEditor} />
      
      <div className="flex justify-end gap-4 mt-6">
        <Button
          variant="secondary"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancelar
        </Button>

        <Button variant="primary" onClick={handleSave} disabled={loading}>
          {loading ? "Salvando..." : "Salvar alterações"}
        </Button>
      </div>
    </section>
  );
}
