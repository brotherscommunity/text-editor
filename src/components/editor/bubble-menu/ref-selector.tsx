"use client";

import { cn, getUrlFromString } from "@/lib/utils";
import { Editor } from "@tiptap/core";
import { Check, LinkIcon, Trash } from "lucide-react";
import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";

interface LinkSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  handleAddRef?: (arg: number) => void;
  handleRefRemove?: (arg: number) => void;
}

export const RefSelector: FC<LinkSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
  handleAddRef = (arg: number) => {},
  handleRefRemove,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Autofocus on input by default
  useEffect(() => {
    inputRef.current && inputRef.current?.focus();
  });

  const handleLinkSubmission = () => {
    // const url = getUrlFromString(inputRef.current?.value || "");
    const index = Number(inputRef.current?.value);
    if (index) {
      editor.chain().focus().insertCitation(`#ref-${index}`).run();
      handleAddRef(index);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        className={cn(
          "flex h-fit items-center space-x-2 px-3 h-10 text-sm font-medium text-stone-600 hover:bg-stone-100 active:bg-stone-200",
          {
            "bg-secondary text-white": isOpen,
          }
        )}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <p className="text-base leading-none">
          <LinkIcon className="h-4 w-4" />
        </p>
        <p className={cn("decoration-stone-400 leading-none")}>Cite</p>
      </button>
      {isOpen && (
        <div className="absolute top-10 left-[-80px] z-[99999] mt-1 flex w-60 overflow-hidden rounded border border-stone-200 bg-white p-1 shadow-xl animate-in fade-in slide-in-from-top-1">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter a number"
            className="flex-1 bg-white p-1 text-sm outline-none"
            defaultValue={editor.getAttributes("link").href || ""}
          />

          <button
            onClick={handleLinkSubmission}
            type="button"
            className="flex items-center rounded-sm p-1 text-stone-600 transition-all hover:bg-stone-100"
          >
            <Check className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};
