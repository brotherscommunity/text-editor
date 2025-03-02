"use client";

import { removeFileAction } from "@/app/_actions/file";
import { uploadFileAction } from "@/app/_actions/file";

// import { useToast } from "@/hooks/use-toast";

export async function handleUpload(file: File) {
  const data = new FormData();
  data.append("image", file);
  const [urlData, error] = await uploadFileAction({ file: data });
  if (!error) {
    return urlData.data;
  }
  return;
}

export async function handleRemove(url: string) {
  //! check if its stored in our bucket
  // if (url.match(/brothers-files/)) {
  //   await removeFileAction({ name: url });
  // }
  await removeFileAction({ name: url });
}
