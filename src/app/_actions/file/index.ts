"use server";

import { createServerAction } from "zsa";
import * as z from "zod";

export const uploadFileAction = createServerAction()
  .input(z.object({}).passthrough())
  .handler(async () => {
    return {
      data: "https://storage.googleapis.com/brothers-bucket/blog/Algeria%20Thumbnail-1739247717866.jpg",
    };
  });

export const removeFileAction = createServerAction()
  .input(z.object({}).passthrough())
  .handler(async () => {
    return null;
  });
