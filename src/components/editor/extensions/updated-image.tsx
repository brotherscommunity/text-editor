import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";

const UpdatedImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
      },
      height: {
        default: null,
      },
    };
  },
});

export default UpdatedImage;

export const UpdatedYoutube = Youtube.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: { default: "100%" },
      height: {
        default: null,
      },
    };
  },
});
