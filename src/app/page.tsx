"use client";
import WysiwygEditor from "@/components/editor/editor";
import { useState } from "react";

export default function page() {
  const [content, setContent] = useState<string>();
  return (
    <div className="mt-14 max-w-[1000px] mx-auto px-8">
      <WysiwygEditor
        content={""}
        onUpdate={(editor) => setContent(editor?.getHTML())}
        inputName={null}
      />
    </div>
  );
}
