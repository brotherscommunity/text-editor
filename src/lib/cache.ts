import { unstable_cache as nextCache } from "next/cache";
import { cache as reactCache } from "react";

export function cache(
  cb: (...args: any) => any,
  keyParts: string[],
  options = {}
) {
  return nextCache(reactCache(cb), keyParts, options);
}
