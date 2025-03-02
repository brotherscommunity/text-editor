"use client";

import "@/styles/prosemirror.css";
import "@/styles/editor.css";
import { Editor as EditorClass } from "@tiptap/core";
import { EditorProps } from "@tiptap/pm/view";
import {
  EditorContent,
  Extension,
  JSONContent,
  useEditor,
} from "@tiptap/react";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { EditorBubbleMenu, EditorBubbleMenuMini } from "./bubble-menu";
import { ImageResizer } from "./extensions/image-resizer";
import { defaultExtensions, defaultExtensionsMini } from "./extensions";
import { useDebouncedCallback } from "use-debounce";
import { handleRemove } from "./extensions/handle-upload";
import StarterKit from "@tiptap/starter-kit";
// import { defaultEditorProps } from "./props";

export type WysiwygEditorRef = { clearContent: () => void };

const WysiwygEditor = forwardRef(
  (
    {
      className = "relative w-full focus:ring-orange-600 focus:outline-8 max-w-screen-lg border-stone-200 bg-white sm:mb-[20px] sm:rounded-lg sm:border sm:shadow-lg prose prose-auto",
      defaultValue = "",
      onUpdate = () => {},
      onDebouncedUpdate = () => {},
      debounceDuration = 750,
      mini = false,
      content = "",
      handleRefRemove,
      handleAddRef,
      inputName,
    }: {
      className?: string;
      defaultValue?: string;
      onDebouncedUpdate?: (editor?: EditorClass) => void | Promise<void>;
      debounceDuration?: number;
      onUpdate?: (editor?: EditorClass) => void | Promise<void>;
      mini?: boolean;
      content?: string;
      handleRefRemove?: (arg: number) => void;
      handleAddRef?: (arg: number) => void;
      inputName?: string | null;
    },
    ref
  ) => {
    const [previousImages, setPreviousImages] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const onUpdateImage = async (editor: EditorClass) => {
      if (!editor) return;

      const currentImages: string[] = [];
      editor.getJSON().content?.forEach((item: JSONContent) => {
        if (item.type === "image") {
          currentImages.push(item.attrs?.src);
        }
      });

      const deletedImages = previousImages.filter(
        (url) => !currentImages.includes(url)
      );

      try {
        const deletePromise = deletedImages.map((url) => handleRemove(url));
        Promise.all(deletePromise);
      } catch (e) {}

      setPreviousImages(currentImages);
    };

    const debouncedUpdates = useDebouncedCallback(
      async ({ editor }: { editor: EditorClass }) => {
        onDebouncedUpdate(editor);
      },
      debounceDuration
    );

    const editor = useEditor({
      extensions: mini
        ? defaultExtensionsMini
        : defaultExtensions(handleRefRemove),
      content: content,
      immediatelyRender: false,
      onUpdate: (e) => {
        !mini ? onUpdateImage(e.editor) : () => {};
        onUpdate(e.editor);
        if (inputRef.current) {
          inputRef.current.value = e.editor.getHTML();
        }
        debouncedUpdates(e);
      },
    });

    useImperativeHandle(ref, () => ({
      clearContent: () => editor?.commands.clearContent(true),
    }));

    return (
      <div
        onClick={() => {
          editor?.chain().focus().run();
        }}
        className={className}
      >
        {editor &&
          (mini ? (
            <EditorBubbleMenuMini editor={editor} />
          ) : (
            <EditorBubbleMenu handleAddRef={handleAddRef} editor={editor} />
          ))}
        {(editor?.isActive("youtube") || editor?.isActive("image")) && (
          <ImageResizer editor={editor} />
        )}

        <input
          type="hidden"
          {...(inputName !== null ? { name: inputName || "content" } : {})}
          ref={inputRef}
        />
        <div className="prose prose-lg max-w-none">
          <EditorContent editor={editor} />
        </div>
      </div>
    );
  }
);

WysiwygEditor.displayName = "WysiwygEditor";

export default WysiwygEditor;
