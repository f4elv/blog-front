"use client";

import { useState } from "react";
import EditorJS from "../../components/tiptap/Editor";
import { Editor } from "@tiptap/react";
import { Button } from "@/app/components/Button";

export default function Page() {
  const [title, setTitle] = useState("");
  const [editor, setEditor] = useState<Editor | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    if (!editor) return;

    const payload = {
      title,
      content: editor.getJSON(),
    };

    setLoading(true);

    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);
  }

  return (
    <div className="py-10 max-w-5xl mx-auto">
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
