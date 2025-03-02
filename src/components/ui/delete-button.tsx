"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DoorOpen, Trash2Icon } from "lucide-react";
import React, { ReactNode, useState } from "react";
import { useServerAction } from "zsa-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Trash } from "lucide-react";
import { LoaderButton } from "../small/loading-button";
import { useRouter } from "next/navigation";

export function DeleteButton({
  action,
  tobedeltedID,
  successMessage = "Successully deleted!",
  title,
  description = " Are you sure you want to delete? This action cannot be undone.",
  label = "Delete",
  type = "submit",
  disabled = false,
  icon = null,
  afterSuccess = () => {},
  className = "",
}: {
  action: (...args: any) => any;
  type?: "button" | "submit";
  label?: string | ReactNode;
  description?: string;
  title: string;
  successMessage?: string;
  tobedeltedID: string | number | Record<string, any>;
  disabled?: boolean;
  icon?: React.ReactElement | null;
  afterSuccess?: () => void;
  className?: string;
}) {
  //! useBlogParam
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { execute, isPending, error } = useServerAction(action, {
    onSuccess() {
      afterSuccess();
      toast({
        title: "Success",
        description: successMessage,
      });
    },
    //! on error close alert dialoag and show not found error
    onError({ err }) {
      toast({
        title: "Uh oh",
        variant: "destructive",
        description: "Something went wrong firing this dude." + err?.message,
      });
    },
    onFinish() {
      setIsOpen(false);
      router.refresh();
    },
  });

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant={"destructive"}
          className={cn(`${className}`)}
          type={type}
          disabled={disabled}
        >
          <span className="flex gap-3 items-center py-1 h-fit">
            {icon}
            {label}
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <LoaderButton
            isLoading={isPending}
            variant={"destructive"}
            onClick={() => {
              if (
                typeof tobedeltedID === "string" ||
                typeof tobedeltedID === "number"
              ) {
                execute({ id: tobedeltedID });
              } else {
                execute(tobedeltedID);
              }
            }}
          >
            {label}
          </LoaderButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
