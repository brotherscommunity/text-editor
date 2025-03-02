import { Node } from "@tiptap/core";
import refDeletionPlugin, { handleDelete } from "./ref-delete";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    citation: {
      insertCitation: (citationLink: string) => ReturnType;
    };
  }
}

export const CitationNode = (handleDelete: handleDelete) =>
  Node.create({
    name: "citation",

    group: "inline",

    inline: true,

    atom: true,

    draggable: true,

    priority: 1000,

    addAttributes() {
      return {
        citationLink: {
          default: null,
        },
        citationId: {
          default: null,
        },
      };
    },

    parseHTML() {
      return [
        {
          tag: "a[data-citation]",
          getAttrs: (dom) => {
            if (typeof dom === "string") return {};
            const element = dom as HTMLAnchorElement;
            return {
              citationLink: element.getAttribute("href"),
              citationId: element.getAttribute("citation-id"),
            };
          },
        },
      ];
    },

    renderHTML({ node }) {
      const index = node.attrs.citationLink.split("-")[1];
      const citationId = node.attrs.citationId;
      return [
        "a",
        {
          href: node.attrs.citationLink,
          // target: "_self",
          id: "index" + "-" + index,
          "data-citation": true,
          "citation-id": citationId,
          style: "color: #007bff; text-decoration: none; font-size: 14px;",
          rel: "noreferrer",
        },

        "[" + index + "]",
      ];
    },

    addCommands() {
      return {
        insertCitation:
          (citationLink) =>
          ({ commands }) => {
            return commands.insertContent({
              type: this.name,
              attrs: {
                citationLink,
                citationId: Math.random().toString(36).substr(2, 9),
              },
            });
          },
      };
    },

    isActive() {
      return false;
    },

    addProseMirrorPlugins() {
      return [refDeletionPlugin(handleDelete)];
    },
  });
