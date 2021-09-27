import * as React from "react";
import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import {
  DisclosureContentOptions,
  DisclosureContentHTMLProps,
  useDisclosureContent,
} from "../Disclosure/DisclosureContent";
import { Portal } from "../Portal/Portal";
import { DialogStateReturn } from "./DialogState";
import { DialogBackdropContext } from "./__utils/DialogBackdropContext";
import { DIALOG_BACKDROP_KEYS } from "./__keys";

export type DialogBackdropOptions = DisclosureContentOptions &
  Pick<Partial<DialogStateReturn>, "modal">;

export type DialogBackdropHTMLProps = DisclosureContentHTMLProps;

export type DialogBackdropProps = DialogBackdropOptions &
  DialogBackdropHTMLProps;

export const useDialogBackdrop = createHook<
  DialogBackdropOptions,
  DialogBackdropHTMLProps
>({
  name: "DialogBackdrop",
  compose: useDisclosureContent,
  keys: DIALOG_BACKDROP_KEYS,

  useOptions({ modal = true, ...options }) {
    return { modal, ...options };
  },

  useProps(options, { wrapElement: htmlWrapElement, ...htmlProps }) {
    const wrapElement = React.useCallback(
      (element: React.ReactNode) => {
        if (options.modal) {
          element = (
            <Portal>
              <DialogBackdropContext.Provider value={options.baseId}>
                {element}
              </DialogBackdropContext.Provider>
            </Portal>
          );
        }
        if (htmlWrapElement) {
          return htmlWrapElement(element);
        }
        return element;
      },
      [options.modal, htmlWrapElement]
    );

    return {
      id: undefined,
      "data-dialog-ref": options.baseId,
      wrapElement,
      ...htmlProps,
    };
  },
});

export const DialogBackdrop = createComponent({
  as: "div",
  memo: true,
  useHook: useDialogBackdrop,
});
