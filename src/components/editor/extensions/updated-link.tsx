import Link, { isAllowedUri } from "@tiptap/extension-link";

export const UpdatedLink = Link.extend({
  parseHTML() {
    return [
      {
        tag: "a[href]",
        getAttrs: (dom) => {
          const href = (dom as HTMLElement).getAttribute("href");
          const citation = (dom as HTMLElement).getAttribute("data-citation");
          if (citation) {
            return false;
          }

          // prevent XSS attacks
          if (
            !href ||
            !this.options.isAllowedUri(href, {
              defaultValidate: (url) =>
                !!isAllowedUri(url, this.options.protocols),
              protocols: this.options.protocols,
              defaultProtocol: this.options.defaultProtocol,
            })
          ) {
            return false;
          }
          return null;
        },
      },
    ];
  },
});
