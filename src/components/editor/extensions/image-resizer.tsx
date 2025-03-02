import { Editor } from "@tiptap/core";
import { useState } from "react";
import Moveable from "react-moveable";

export const ImageResizer = ({ editor }: { editor: any }) => {
  let image: HTMLImageElement | HTMLIFrameElement;

  const updateMediaSize = (target: HTMLElement | null) => {
    const imageInfo = image;
    if (imageInfo) {
      const { state, view } = editor;
      const { selection } = state;

      const { from } = selection;
      // Get the selected node's position

      const node = editor.view.domAtPos(selection.from).node;
      if (node && node.childNodes?.length) {
        const imgNode: typeof node = Array.from(node.children).find(
          (child: typeof node) => {
            console.log(child.nodeName);
            return child.nodeName === "IMG";
          }
        );
        if (imgNode) {
          const transaction = state.tr.setNodeMarkup(from, undefined, {
            src: imageInfo.src,
            // alt: imageInfo.getAttribute("alt"),
            alt: "post-image",
            // title: imgNode.getAttribute("title"),
            width: imageInfo.style.width || imgNode.attrs.width,
            height: imageInfo.style.height || imgNode.attrs.height,
          });

          view.dispatch(transaction);

          // Apply the transaction to update the image node
          // view.dispatch(transaction);
          //     const attrs = {
          //       src: imageInfo.src,
          //       width: imageInfo.style.width,
          //       height: imageInfo.style.height,
          //     };
          //     editor.chain().focus().setAttrs(attrs).run();
          // editor.chain().focus().setImage(attrs).run();
        }
        // imgNode.width = `${imageInfo.style.width}`;
        // imgNode.height = `${imageInfo.style.height}`;
      }
      // editor.commands.setNodeSelection(selection.from); // Update selection position
    }
    //   editor.commands.setImage({
    //     src: imageInfo.src,
    //     width: Number(imageInfo.style.width.replace("px", "")),
    //     height: Number(imageInfo.style.height.replace("px", "")),
    //   });
    //   editor.commands.setNodeSelection(selection.from);
    // }
  };

  const pickImage = (doc: any) => {
    if (doc.src) {
      image = doc;
    } else {
      image = doc.firstChild;
    }

    return image;
  };

  return (
    <>
      <Moveable
        target={pickImage(
          document.querySelector(".ProseMirror-selectednode") as any
        )}
        container={null}
        origin={false}
        /* Resize event edges */
        edge={false}
        throttleDrag={0}
        /* When resize or scale, keeps a ratio of the width, height. */
        keepRatio={true}
        /* resizable*/
        /* Only one of resizable, scalable, warpable can be used. */
        resizable={true}
        throttleResize={0}
        onResize={({
          target,
          width,
          height,
          // dist,
          delta,
        }: // direction,
        // clientX,
        // clientY,
        any) => {
          delta[0] && (target!.style.width = `${width}px`);
          delta[1] && (target!.style.height = `${height}px`);
        }}
        // { target, isDrag, clientX, clientY }: any
        onResizeEnd={() => {
          updateMediaSize(document.querySelector(".ProseMirror-selectednode"));
        }}
        /* scalable */
        /* Only one of resizable, scalable, warpable can be used. */
        scalable={true}
        throttleScale={0}
        /* Set the direction of resizable */
        renderDirections={["w", "e"]}
        onScale={({
          target,
          // scale,
          // dist,
          // delta,
          transform,
        }: // clientX,
        // clientY,
        any) => {
          target!.style.transform = transform;
        }}
      />
    </>
  );
};
