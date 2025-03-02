import { Editor } from "@tiptap/core";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Check,
  CheckSquare,
  ChevronDown,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  ListOrdered,
  MoveLeft,
  TextIcon,
  TextQuote,
  Tornado,
} from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";
import { BubbleMenuItem } from ".";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NodeSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const NodeSelector: FC<NodeSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  const items: BubbleMenuItem[] = [
    {
      name: "Text",
      icon: TextIcon,
      command: () =>
        editor.chain().focus().toggleNode("paragraph", "paragraph").run(),
      // I feel like there has to be a more efficient way to do this – feel free to PR if you know how!
      isActive: () =>
        editor.isActive("paragraph") &&
        !editor.isActive("bulletList") &&
        !editor.isActive("orderedList"),
    },
    {
      name: "H1",
      icon: Heading1,
      command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive("heading", { level: 1 }),
    },
    {
      name: "H2",
      icon: Heading2,
      command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive("heading", { level: 2 }),
    },
    {
      name: "H3",
      icon: Heading3,
      command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive("heading", { level: 3 }),
    },
    {
      name: "H4",
      icon: Heading4,
      command: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      isActive: () => editor.isActive("heading", { level: 4 }),
    },
    {
      name: "H5",
      icon: Heading5,
      command: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
      isActive: () => editor.isActive("heading", { level: 5 }),
    },
    {
      name: "H6",
      icon: Heading6,
      command: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
      isActive: () => editor.isActive("heading", { level: 6 }),
    },
    {
      name: "To-do List",
      icon: CheckSquare,
      command: () => editor.chain().focus().toggleTaskList().run(),
      isActive: () => editor.isActive("taskItem"),
    },
    {
      name: "Bullet List",
      icon: ListOrdered,
      command: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive("bulletList"),
    },
    {
      name: "Numbered List",
      icon: ListOrdered,
      command: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive("orderedList"),
    },
    {
      name: "Quote",
      icon: TextQuote,
      command: () =>
        editor
          .chain()
          .focus()
          .toggleNode("paragraph", "paragraph")
          .toggleBlockquote()
          .run(),
      isActive: () => editor.isActive("blockquote"),
    },
    {
      name: "Code",
      icon: Code,
      command: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive("codeBlock"),
    },
  ];

  const activeItem = items.filter((item) => item.isActive()).pop() ?? {
    name: "Multiple",
  };

  return (
    <Popover open={isOpen}>
      <div className="relative h-full">
        <PopoverTrigger
          className={cn(
            "flex justify-between h-full items-center gap-1 whitespace-nowrap p-2 text-sm font-medium text-stone-600 hover:bg-stone-100 active:bg-stone-200 data-state  max-w-32 w-fit",
            {
              "bg-secondary text-white": isOpen,
            }
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{activeItem?.name}</span>
          <ChevronDown className="h-4 w-4" />
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className="z-[99999] my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto rounded border border-stone-200 bg-white p-1 shadow-xl animate-in fade-in slide-in-from-top-1"
        >
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.command();
                setIsOpen(false);
              }}
              className="flex items-center justify-between rounded-sm px-2 py-1 text-sm text-stone-600 hover:bg-stone-100"
              type="button"
            >
              <div className="flex items-center space-x-2">
                <div className="rounded-sm border border-stone-200 p-1">
                  <item.icon className="h-3 w-3" />
                </div>
                <span>{item.name}</span>
              </div>
              {activeItem.name === item.name && <Check className="h-4 w-4" />}
            </button>
          ))}
        </PopoverContent>
      </div>
    </Popover>
  );
};

export const AlignmentSelector: FC<NodeSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  const items: BubbleMenuItem[] = [
    {
      name: "Left",
      icon: AlignLeft,
      command: () => editor.chain().focus().setTextAlign("left").run(),
      isActive: () => editor.isActive({ textAlign: "left" }),
    },
    {
      name: "Right",
      icon: AlignRight,
      command: () => editor.chain().focus().setTextAlign("right").run(),
      isActive: () => editor.isActive({ textAlign: "right" }),
    },
    {
      name: "Justify",
      icon: AlignJustify,
      command: () => editor.chain().focus().setTextAlign("justify").run(),
      isActive: () => editor.isActive({ textAlign: "justify" }),
    },
    {
      name: "Center",
      icon: AlignCenter,
      command: () => editor.chain().focus().setTextAlign("center").run(),
      isActive: () => editor.isActive({ textAlign: "center" }),
    },

    {
      name: "None",
      icon: Tornado,
      command: () => editor.chain().focus().unsetTextAlign().run(),
      isActive: () => false,
    },
  ];

  const activeItem = items.filter((item) => item.isActive()).pop() ?? {
    ...items[4],
  };

  // console.log(activeItem, "lpol");
  //console.log(editor.chain().focus().setTextAlign("left").run());

  return (
    <Popover open={isOpen}>
      <div className="relative h-full">
        <PopoverTrigger onClick={() => setIsOpen(!isOpen)}>
          <div
            className={cn(
              "flex justify-between h-full items-center gap-1 whitespace-nowrap p-2 text-sm font-medium text-stone-600 hover:bg-stone-100 active:bg-stone-200 data-state  w-16",
              {
                "bg-secondary text-white": isOpen,
              }
            )}
          >
            <activeItem.icon />
            <ChevronDown className="h-4 w-4" />
          </div>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className="z-[99999] my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto rounded border border-stone-200 bg-white p-1 shadow-xl animate-in fade-in slide-in-from-top-1"
        >
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.command();
                setIsOpen(false);
              }}
              className="flex items-center justify-between rounded-sm px-2 py-1 text-sm text-stone-600 hover:bg-stone-100"
              type="button"
            >
              <div className="flex items-center space-x-2">
                <div className="rounded-sm border border-stone-200 p-1">
                  <item.icon className="h-3 w-3" />
                </div>
                <span>{item.name}</span>
              </div>
              {activeItem.name === item.name && <Check className="h-4 w-4" />}
            </button>
          ))}
        </PopoverContent>
      </div>
    </Popover>
  );
};
