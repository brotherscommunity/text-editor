import { type ClassValue, clsx } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  const formattedDate = new Date(date);
  return formattedDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const extractFormData = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  const formObject: Record<string, any> = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });

  return formObject;
};

export const handleSubmit =
  (onSubmit: (data: Record<string, any>, form: HTMLFormElement) => void) =>
  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formDataObject = extractFormData(e);
    onSubmit(formDataObject, form);
  };
