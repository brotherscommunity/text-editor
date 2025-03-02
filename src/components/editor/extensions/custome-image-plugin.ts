import { Editor } from "@tiptap/core";
import { Plugin } from "prosemirror-state";

/**
 * function for image drag n drop(for tiptap)
 * @see https://gist.github.com/slava-vishnyakov/16076dff1a77ddaca93c4bccd4ec4521#gistcomment-3744392
 */
export type UploadFn = (image: File) => Promise<string | null>;

export const uploadImagePlugin = (upload: UploadFn, editor: Editor) => {
  return new Plugin({
    props: {
      handlePaste(view, event) {
        console.log("-----image dropped-----------");

        const items = Array.from(event.clipboardData?.items || []);
        const { schema } = view.state;

        items.forEach((item) => {
          const image = item.getAsFile();

          if (item.type.indexOf("image") === 0) {
            event.preventDefault();

            if (upload && image) {
              upload(image).then((src) => {
                if (src) {
                  // const node = schema.nodes.image.create({
                  //   src,
                  // });
                  // const transaction = view.state.tr.replaceSelectionWith(node);
                  // view.dispatch(transaction);
                  const attrs = {
                    src: src,
                    width: undefined,
                    height: undefined,
                    alt: "blog image",
                  };
                  editor.chain().focus().setImage(attrs).run();
                }
              });
            }
          }
        });

        return false;
      },
      handleDOMEvents: {
        drop(view, event) {
          const hasFiles = event.dataTransfer?.files?.length;

          if (!hasFiles) {
            return false;
          }

          const images = Array.from(event!.dataTransfer!.files).filter((file) =>
            /image/i.test(file.type)
          );

          if (images.length === 0) {
            return false;
          }

          event.preventDefault();

          const { schema } = view.state;
          const coordinates = view.posAtCoords({
            left: event.clientX,
            top: event.clientY,
          });

          images.forEach(async (image) => {
            const url = await upload(image);
            if (url) {
              const attrs = {
                src: url,
                width: undefined,
                height: undefined,
                alt: "blog image",
              };
              editor.chain().focus().setImage(attrs).run();
            }
          });
          return false;
        },
      },
    },
  });
};
