"use client";

import { cn, getUrlFromString } from "@/lib/utils";
import { Editor } from "@tiptap/core";
import { Check, LinkIcon, Trash } from "lucide-react";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

interface LinkSelectorProps {
  editor: Editor;
  isOpen: boolean;
  onAddReference: (refNo: string) => void;
  removeLink: { link: string; seter: (text: string) => void };
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const LinkSelector: FC<LinkSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
  onAddReference,
  removeLink,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Autofocus on input by default
  useEffect(() => {
    inputRef.current && inputRef.current?.focus();
  });

  const handleLinkSubmission = () => {
    const url = getUrlFromString(`${inputRef.current?.value}` || "");
    if (url) {
      const currentText = editor.state.doc.textBetween(
        editor.state.selection.from,
        editor.state.selection.to
      );

      const refNo = links.length > 0 ? links[links.length - 1].ref + 1 : 1;
      setLinks((prev) => [...prev, { ref: refNo, url: url }]);
      editor
        .chain()
        .focus()
        .setLink({ href: `${url}` })
        .insertContent(`[${refNo}]${currentText}`)
        .run();
      onAddReference(url);
      setIsOpen(false);
    }
  };

  const unsetLinkByHref = (targetHref: string) => {
    if (!editor) return;

    // Traverse the document to find all link marks
    editor.state.doc.descendants((node, pos) => {
      if (node.marks) {
        node.marks.forEach((mark) => {
          if (mark.type.name === "link" && mark.attrs.href === targetHref) {
            editor.chain().extendMarkRange("link").focus().run();
            const { from, to } = editor.state.selection;
            const linkText = editor.state.doc.textBetween(from, to);
            const cleanTxt = linkText.replace(/\[\d+\]sdf?|\[\d+\]/g, "");
            // Remove the link mark at the current position
            editor
              .chain()
              .focus()
              .extendMarkRange("link")
              .unsetLink() // Unset the link
              .insertContentAt({ from, to }, cleanTxt)
              .run();
          }
        });
      }
    });
  };

  useEffect(() => {
    if (removeLink.link) {
      unsetLinkByHref(removeLink.link);
    }
  }, [removeLink.link]);
  // const [refNo, setRefNo] = useState<number>(1);
  const [links, setLinks] = useState<{ ref: number; url: string }[]>([]);

  return (
    <div className="relative">
      <button
        type="button"
        className={cn(
          "flex h-full items-center space-x-2 px-3 py-1.5 text-sm font-medium text-stone-600 hover:bg-stone-100 active:bg-stone-200",
          { "bg-red-500": isOpen }
        )}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <p className="text-base">
          <LinkIcon className="h-4 w-4" />
        </p>
        <p
          className={cn("underline decoration-stone-400 underline-offset-4", {
            "text-blue-500": editor.isActive("link"),
          })}
        >
          Add Ref
        </p>
      </button>
      {isOpen && (
        <div className="absolute top-8 left-[-80px] z-[99999] mt-1 flex w-60 overflow-hidden rounded border border-stone-200 bg-white p-1 shadow-xl animate-in fade-in slide-in-from-top-1">
          <input
            ref={inputRef}
            onChange={() => {}}
            type="text"
            placeholder="Paste a link"
            className="flex-1 bg-white p-1 text-sm outline-none"
            defaultValue={editor.getAttributes("link").href || ""}
          />
          {editor.getAttributes("link").href ? (
            <button
              type="button"
              className="flex items-center rounded-sm p-1 text-red-600 transition-all hover:bg-red-100 dark:hover:bg-red-800"
              onClick={() => {
                editor.chain().extendMarkRange("link").focus().run();
                const { from, to } = editor.state.selection;
                const linkText = editor.state.doc.textBetween(from, to);
                const cleanTxt = linkText.replace(/\[\d+\]sdf?|\[\d+\]/g, "");
                setLinks((prev) =>
                  prev.filter(
                    (link) => link.url !== editor.getAttributes("link").href
                  )
                );
                removeLink.seter(editor.getAttributes("link").href);
                editor
                  .chain()
                  .focus()
                  .unsetLink()
                  .insertContentAt({ from, to }, cleanTxt)
                  .run();

                setIsOpen(false);
              }}
            >
              <Trash className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleLinkSubmission}
              type="button"
              className="flex items-center rounded-sm p-1 text-stone-600 transition-all hover:bg-stone-100"
            >
              <Check className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
