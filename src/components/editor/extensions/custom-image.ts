import { Node, nodeInputRule } from "@tiptap/core";
import { mergeAttributes } from "@tiptap/react";
import { UploadFn, uploadImagePlugin } from "./custome-image-plugin";

/**
 * Tiptap Extension to upload images
 * @see  https://gist.github.com/slava-vishnyakov/16076dff1a77ddaca93c4bccd4ec4521#gistcomment-3744392
 * @since 7th July 2021
 *
 * Matches following attributes in Markdown-typed image: [, alt, src, title]
 *
 * Example:
 * ![Lorem](image.jpg) -> [, "Lorem", "image.jpg"]
 * ![](image.jpg "Ipsum") -> [, "", "image.jpg", "Ipsum"]
 * ![Lorem](image.jpg "Ipsum") -> [, "Lorem", "image.jpg", "Ipsum"]
 */

interface ImageOptions {
  inline: boolean;
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    image: {
      /**
       * Add an image
       */
      setImage: (options: {
        src: string;
        alt?: string;
        title?: string;
        height?: string | number;
        width?: string | number;
      }) => ReturnType;
    };
  }
}

const IMAGE_INPUT_REGEX = /!\[(.+|:?)\]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/;

export const TipTapCustomImage = (uploadFn: UploadFn) => {
  return Node.create<ImageOptions>({
    name: "image",

    defaultOptions: {
      inline: false,
      HTMLAttributes: {},
    },

    inline() {
      return false;
    },

    group() {
      return "block";
    },

    draggable: true,

    addAttributes() {
      return {
        alt: {
          default: null,
        },
        title: {
          default: null,
        },
        width: {
          default: null,
        },
        height: {
          default: null,
        },
      };
    },
    parseHTML: () => [
      {
        tag: "img[src]",
        getAttrs: (dom) => {
          if (typeof dom === "string") return {};
          const element = dom as HTMLImageElement;

          const obj = {
            src: element.getAttribute("src"),
            title: element.getAttribute("title"),
            alt: element.getAttribute("alt"),
            width: element.getAttribute("width") || element.style.width,
            height: element.getAttribute("height") || element.style.height,
          };
          return obj;
        },
      },
    ],
    renderHTML: ({ HTMLAttributes }) => [
      "img",
      mergeAttributes(HTMLAttributes),
    ],

    addCommands() {
      return {
        setImage:
          (attrs) =>
          ({ state, dispatch }) => {
            const { selection } = state;
            const position = selection.$head
              ? selection.$head.pos
              : selection.$to.pos;

            const node = this.type.create(attrs);
            const transaction = state.tr.insert(position, node);
            return dispatch?.(transaction);
          },
      };
    },
    addInputRules() {
      return [
        // nodeInputRule(IMAGE_INPUT_REGEX, this.type, (match) => {
        //   const [, alt, src, title] = match;
        //   return {
        //     src,
        //     alt,
        //     title,
        //   };
        // }),
        nodeInputRule({
          find: IMAGE_INPUT_REGEX,
          type: this.type,
          getAttributes: (match) => {
            const [, alt, src, title, height, width] = match;
            return {
              src,
              alt,
              title,
              height,
              width,
            };
          },
        }),
      ];
    },
    addProseMirrorPlugins() {
      return [uploadImagePlugin(uploadFn, this.editor)];
    },
  });
};
