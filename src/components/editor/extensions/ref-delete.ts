import { Plugin, PluginKey } from "prosemirror-state";

const linkDeletionPlugin = (handleRemove: handleDelete) =>
  new Plugin({
    key: new PluginKey("linkDeletionPlugin"),
    appendTransaction(transactions, oldState, newState) {
      let tr = newState.tr;
      if (!handleRemove) return null;
      transactions.forEach((transaction) => {
        if (transaction.docChanged) {
          oldState.doc.descendants((oldNode, pos) => {
            if (oldNode.type.name === "citation") {
              const numberMatch = oldNode.attrs.citationLink.match(/\d+/);
              let linkRemoved = true;

              newState.doc.descendants((newNode, newPos) => {
                if (newNode.sameMarkup(oldNode)) {
                  linkRemoved = false;
                  return;
                }
              });

              if (linkRemoved) {
                handleRemove(numberMatch[0]);
              }
            }
          });
        }
      });

      return null;
    },
  });

export default linkDeletionPlugin;

export type handleDelete = ((arg: number) => void) | undefined;
