"use client";

import { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";

type TocItem = {
  id: string;
  text: string;
  level: number;
};

export function TOC({ editor }: { editor: Editor }) {
  const [items, setItems] = useState<TocItem[]>([]);

  useEffect(() => {
    const update = () => {
      const toc: TocItem[] = [];

      editor.state.doc.descendants((node) => {
        if (node.type.name === "heading" && [1, 2].includes(node.attrs.level)) {
          toc.push({
            id: node.attrs.id,
            text: node.textContent,
            level: node.attrs.level,
          });
        }
      });

      setItems(toc);
    };

    editor.on("update", update);
    update();

    return () => {
      editor.off("update", update);
    };
  }, [editor]);

  return (
    <aside className="border-zinc-200 rounded-xl">
      <p className="mb-2 text-sm font-semibold text-zinc-500">Neste artigo</p>

      <ul className="space-y-2 text-sm text-left">
        {items.map((item) => (
          <li key={item.id} className={item.level === 2 ? "" : ""}>
            <button
              onClick={() =>
                document
                  .getElementById(item.id)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="hover:text-red-800"
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
