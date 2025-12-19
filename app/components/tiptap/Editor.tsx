"use client";

import "./style.css";
import {
  Editor,
  EditorContent,
  useEditor,
  useEditorState,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyleKit } from "@tiptap/extension-text-style";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight } from "lowlight";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import json from "highlight.js/lib/languages/json";
import { Button } from "../Button";
import { TabIndent } from "./TabIdent";
import { useEffect } from "react";

const lowlight = createLowlight();
lowlight.register("js", javascript);
lowlight.register("css", css);
lowlight.register("json", json);

const extensions = [
  StarterKit.configure({ codeBlock: false }),
  CodeBlockLowlight.configure({ lowlight }),
  TextStyleKit,
  TabIndent,
];

function MenuBar({ editor }: { editor: Editor }) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive("bold"),
      canBold: ctx.editor.can().chain().toggleBold().run(),
      isItalic: ctx.editor.isActive("italic"),
      canItalic: ctx.editor.can().chain().toggleItalic().run(),
      isHeading1: ctx.editor.isActive("heading", { level: 1 }),
      isHeading2: ctx.editor.isActive("heading", { level: 2 }),
      isBulletList: ctx.editor.isActive("bulletList"),
      isCodeBlock: ctx.editor.isActive("codeBlock"),
    }),
  });

  return (
    <div className="flex gap-4 justify-center">
      <Button
        variant={editorState.isBold ? "primary" : "secondary"}
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`w-full ${editorState.isBold ? "is-active" : ""}`}
      >
        Bold
      </Button>
      <Button
        variant={editorState.isItalic ? "primary" : "secondary"}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`w-full ${editorState.isItalic ? "is-active" : ""}`}
      >
        Italic
      </Button>
      <Button
        variant={editorState.isHeading1 ? "primary" : "secondary"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`w-full ${editorState.isHeading1 ? "is-active" : ""}`}
      >
        Heading 1
      </Button>
      <Button
        variant={editorState.isHeading2 ? "primary" : "secondary"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`w-full ${editorState.isHeading2 ? "is-active" : ""}`}
      >
        Heading 2
      </Button>
      <Button
        variant={editorState.isBulletList ? "primary" : "secondary"}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`w-full ${editorState.isBulletList ? "is-active" : ""}`}
      >
        List
      </Button>
      <Button
        variant={editorState.isCodeBlock ? "primary" : "secondary"}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`w-full ${editorState.isCodeBlock ? "is-active" : ""}`}
      >
        {" "}
        Code block{" "}
      </Button>
    </div>
  );
}

type Props = {
  onReady: (editor: Editor) => void;
};

export default function EditorJS({ onReady }: Props) {
  const editor = useEditor({
    extensions,
    content: "Eai caraio, bora escrever algo legal pohaaaa",
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor) {
      onReady(editor);
    }
  }, [editor, onReady]);

  if (!editor) return null;

  return (
    <div className="max-w-5xl mx-auto items-center">
      <div className="sticky top-4 z-10 border border-red-800 rounded-xl p-4 mb-6 max-w-4xl mx-auto">
        <MenuBar editor={editor} />
      </div>

      <div className="min-h-[40vh] border border-zinc-700 rounded-xl p-4">
        <EditorContent editor={editor} className="tiptap outline-none" />
      </div>
    </div>
  );
}
