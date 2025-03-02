import { cn } from "@/lib/utils";
import { BubbleMenu, BubbleMenuProps, isNodeSelection } from "@tiptap/react";
import {
  BoldIcon,
  CodeIcon,
  ItalicIcon,
  ListChecks,
  ListOrdered,
  RedoIcon,
  StrikethroughIcon,
  UnderlineIcon,
  UndoIcon,
} from "lucide-react";
import { FC, ReactNode, useEffect, useState } from "react";
import { ColorSelector } from "./color-selector";
import { ImageSelector, VideoSelector } from "./image-selector";
import { LinkSelector } from "./link-selector";
import { LinkSelector as LS } from "./link-selector copy";
import { AlignmentSelector, NodeSelector } from "./node-selector";
import { RefSelector } from "./ref-selector";

export interface BubbleMenuItem {
  name: string;
  isActive: () => boolean;
  command: () => void;
  icon: typeof BoldIcon;
}

type EditorBubbleMenuProps = Omit<BubbleMenuProps, "children"> & {
  handleRefRemove?: (arg: any) => void;
  handleAddRef?: (arg: any) => void;
};

export const EditorBubbleMenu: FC<EditorBubbleMenuProps> = (props) => {
  const items: BubbleMenuItem[] = [
    {
      name: "undo",
      isActive: () =>
        props.editor!.isActive("undo") && props.editor!.can().undo(),
      command: () => props.editor!.chain().focus().undo().run(),
      icon: UndoIcon,
    },
    {
      name: "redo",
      isActive: () =>
        props.editor!.isActive("redo") && props.editor!.can().redo(),
      command: () => props.editor!.chain().focus().redo().run(),
      icon: RedoIcon,
    },
    {
      name: "bold",
      isActive: () => props.editor!.isActive("bold"),
      command: () => props.editor!.chain().focus().toggleBold().run(),
      icon: BoldIcon,
    },
    {
      name: "italic",
      isActive: () => props.editor!.isActive("italic"),
      command: () => props.editor!.chain().focus().toggleItalic().run(),
      icon: ItalicIcon,
    },
    {
      name: "underline",
      isActive: () => props.editor!.isActive("underline"),
      command: () => props.editor!.chain().focus().toggleUnderline().run(),
      icon: UnderlineIcon,
    },
    {
      name: "strike",
      isActive: () => props.editor!.isActive("strike"),
      command: () => props.editor!.chain().focus().toggleStrike().run(),
      icon: StrikethroughIcon,
    },
    {
      name: "code",
      isActive: () => props.editor!.isActive("code"),
      command: () => props.editor!.chain().focus().toggleCode().run(),
      icon: CodeIcon,
    },
  ];

  const bubbleMenuProps: EditorBubbleMenuProps = {
    ...props,
    shouldShow: ({ state, editor }) => {
      const { selection } = state;
      const { empty } = selection;

      // don't show bubble menu if:
      // - the selected node is an image
      // - the selection is empty
      // - the selection is a node selection (for drag handles)
      if (editor.isActive("image") || empty || isNodeSelection(selection)) {
        return false;
      }
      return true;
    },
    tippyOptions: {
      moveTransition: "transform 0.15s ease-out",
      onHidden: () => {
        setIsNodeSelectorOpen(false);
        setIsColorSelectorOpen(false);
        setIsLinkSelectorOpen(false);
        setIsAlignmentSelectorOpen(false);
      },
    },
  };

  const [isNodeSelectorOpen, setIsNodeSelectorOpen] = useState(false);
  const [isColorSelectorOpen, setIsColorSelectorOpen] = useState(false);
  const [isLinkSelectorOpen, setIsLinkSelectorOpen] = useState(false);
  const [isLinkSelectorOpen2, setIsLinkSelectorOpen2] = useState(false);
  const [isVideoSelectorOpen, setIsVideoSelectorOpen] = useState(false);
  const [isImageSelectorOpen, setIsImageSelectorOpen] = useState(false);

  const [isAlignmentSelectorOpen, setIsAlignmentSelectorOpen] = useState(false);

  return (
    // <BubbleMenu
    <div className="w-full rounded border border-stone-200 bg-white shadow-sm">
      <div
        {...bubbleMenuProps}
        className="flex flex-wrap items-center w-fit divide-x divide-stone-200  md:gap-4"
      >
        <NodeSelector
          editor={props.editor!}
          isOpen={isNodeSelectorOpen}
          setIsOpen={() => {
            setIsNodeSelectorOpen(!isNodeSelectorOpen);
            setIsColorSelectorOpen(false);
            setIsLinkSelectorOpen(false);
            setIsAlignmentSelectorOpen(false);
          }}
        />

        <RefSelector
          handleRefRemove={props.handleRefRemove}
          handleAddRef={props.handleAddRef}
          editor={props.editor!}
          isOpen={isLinkSelectorOpen2}
          setIsOpen={() => {
            setIsLinkSelectorOpen2(!isLinkSelectorOpen2);
            setIsColorSelectorOpen(false);
            setIsNodeSelectorOpen(false);
            setIsAlignmentSelectorOpen(false);
            setIsImageSelectorOpen(false);
          }}
        />
        <AlignmentSelector
          editor={props.editor!}
          isOpen={isAlignmentSelectorOpen}
          setIsOpen={() => {
            setIsAlignmentSelectorOpen(!isAlignmentSelectorOpen);
            setIsNodeSelectorOpen(false);
            setIsColorSelectorOpen(false);
            setIsLinkSelectorOpen(false);
          }}
        />

        <div className="flex">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={item.command}
              className="p-2 text-stone-600 hover:bg-stone-100 active:bg-stone-200"
              type="button"
            >
              <item.icon
                className={cn("h-4 w-4", {
                  "text-blue-500": item.isActive(),
                })}
              />
            </button>
          ))}
        </div>
        <LinkSelector
          editor={props.editor!}
          isOpen={isLinkSelectorOpen}
          setIsOpen={() => {
            setIsLinkSelectorOpen(!isLinkSelectorOpen);
            setIsColorSelectorOpen(false);
            setIsNodeSelectorOpen(false);
            setIsAlignmentSelectorOpen(false);
            setIsImageSelectorOpen(false);
          }}
        />
        <ImageSelector
          editor={props.editor!}
          isOpen={isImageSelectorOpen}
          setIsOpen={() => {
            setIsImageSelectorOpen(!isImageSelectorOpen);
            setIsLinkSelectorOpen(false);
            setIsColorSelectorOpen(false);
            setIsNodeSelectorOpen(false);
            setIsAlignmentSelectorOpen(false);
          }}
        />
        <VideoSelector
          editor={props.editor!}
          isOpen={isVideoSelectorOpen}
          setIsOpen={() => {
            setIsVideoSelectorOpen(!isVideoSelectorOpen);
            setIsLinkSelectorOpen(false);
            setIsColorSelectorOpen(false);
            setIsNodeSelectorOpen(false);
            setIsAlignmentSelectorOpen(false);
          }}
        />

        <ColorSelector
          editor={props.editor!}
          isOpen={isColorSelectorOpen}
          setIsOpen={() => {
            setIsColorSelectorOpen(!isColorSelectorOpen);
            setIsNodeSelectorOpen(false);
            setIsLinkSelectorOpen(false);
          }}
        />
        {/* </BubbleMenu> */}
      </div>
    </div>
  );
};

export const EditorBubbleMenuMini: FC<EditorBubbleMenuProps> = (props) => {
  const [isLinkSelectorOpen, setIsLinkSelectorOpen] = useState(false);
  const items: BubbleMenuItem[] = [
    {
      name: "bold",
      isActive: () => props.editor!.isActive("bold"),
      command: () => props.editor!.chain().focus().toggleBold().run(),
      icon: BoldIcon,
    },
    {
      name: "italic",
      isActive: () => props.editor!.isActive("italic"),
      command: () => props.editor!.chain().focus().toggleItalic().run(),
      icon: ItalicIcon,
    },
    {
      name: "Bullet List",
      icon: ListChecks,
      command: () => props.editor!.chain().focus().toggleBulletList().run(),
      isActive: () => props.editor!.isActive("bulletList"),
    },
    {
      name: "Numbered List",
      icon: ListOrdered,
      command: () => props.editor!.chain().focus().toggleOrderedList().run(),
      isActive: () => props.editor!.isActive("orderedList"),
    },
  ];

  return (
    // <BubbleMenu
    <div className="w-full rounded border border-stone-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center w-fit divide-x divide-stone-200  md:gap-4">
        <div className="flex flex-wrap">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={item.command}
              className="p-2 text-stone-600 hover:bg-stone-100 active:bg-stone-200"
              type="button"
            >
              <item.icon
                className={cn("h-4 w-4", {
                  "text-blue-500": item.isActive(),
                })}
              />
            </button>
          ))}
          <LinkSelector
            editor={props.editor!}
            isOpen={isLinkSelectorOpen}
            setIsOpen={() => {
              setIsLinkSelectorOpen(!isLinkSelectorOpen);
            }}
          />
        </div>
      </div>
    </div>
  );
};
