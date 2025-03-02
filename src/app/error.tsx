"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  reset,
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex h-full flex-col items-center justify-center min-h-[70vh]">
      <h2 className="text-center">Something went wrong!</h2>
      <Button className="mt-4 " onClick={() => reset()}>
        Try again
      </Button>
    </main>
  );
}
