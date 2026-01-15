"use client";

import { useState, useEffect } from "react";
import EditorJS from "../../components/tiptap/Editor";
import { Editor } from "@tiptap/react";
import { Button } from "@/app/components/Button";
import { createPost } from "@/app/lib/api/post";
import { postSchema } from "@/app/lib/schemas/post";
import { useRouter } from "next/navigation";
import { tokenStorage } from "@/app/lib/helpers/token";

export default function Page() {
  const [title, setTitle] = useState("");
  const [editor, setEditor] = useState<Editor | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = tokenStorage.get();
    if (!token) {
      router.push("/writer/login");
      return;
    }
  }, []);

  async function handleSave() {
    if (!editor) return;

    try {
      setLoading(true);

      const content = editor.getHTML();

      const post = postSchema.parse({
        title,
        content,
      });

      await createPost(post);

      setTitle("");
      editor.commands.clearContent();
      alert(`Post ${title} criado com sucesso`);
    } catch (error) {
      console.error(error);
      alert("Erro ao criar post");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="py-10 max-w-5xl mx-auto">
      <Button
        variant="primary"
        className="mb-4"
        onClick={() => router.push("/writer/dashboard")}
      >
        Voltar
      </Button>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título do bagulho"
        className="border-none outline-none text-4xl font-bold w-full mb-10 text-center"
      />

      <EditorJS onReady={setEditor} />

      <div className="mt-10 flex justify-center">
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={loading}
          className="w-full"
        >
          {loading ? "Postando Poha..." : "Postar essa karalha"}
        </Button>
      </div>
    </div>
  );
}
