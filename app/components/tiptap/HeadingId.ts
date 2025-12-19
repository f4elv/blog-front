import { Extension } from "@tiptap/core";
import { slugify } from "../../utils/slugify";

export const HeadingId = Extension.create({
  onUpdate({ editor }) {
    const tr = editor.state.tr;

    editor.state.doc.descendants((node, pos) => {
      if (node.type.name === "heading" && [1, 2].includes(node.attrs.level)) {
        const text = node.textContent;
        const id = slugify(text);

        if (node.attrs.id !== id) {
          tr.setNodeMarkup(pos, undefined, {
            ...node.attrs,
            id,
          });
        }
      }
    });

    if (tr.steps.length) {
      editor.view.dispatch(tr);
    }
  },
});
