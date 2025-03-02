"use client";

import { ArrowLeftCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className="rounded-md">
      <ArrowLeftCircleIcon className="w-10 h-10 text-white" />
    </button>
  );
}
