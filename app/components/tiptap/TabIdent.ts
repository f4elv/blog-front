import { Extension } from "@tiptap/core";

export const TabIndent = Extension.create({
  name: "tabIndent",

  addKeyboardShortcuts() {
    return {
      Tab: () => {
        return this.editor
          .chain()
          .focus()
          .insertContent("  ") // 2 espaços
          .run();
      },

      "Shift-Tab": () => {
        // comportamento simples: não faz nada
        // (ou você pode implementar outdent depois)
        return true;
      },
    };
  },
});
