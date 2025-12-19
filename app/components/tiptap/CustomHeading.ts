import Heading from "@tiptap/extension-heading";

export const CustomHeading = Heading.extend({
  addAttributes() {
    return {
      id: {
        default: null,
        renderHTML: (attrs) => {
          if (!attrs.id) return {};
          return { id: attrs.id };
        },
      },
    };
  },
});
