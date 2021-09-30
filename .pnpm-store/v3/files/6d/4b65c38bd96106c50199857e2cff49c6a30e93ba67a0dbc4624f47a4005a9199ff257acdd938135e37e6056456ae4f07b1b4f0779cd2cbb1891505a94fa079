import * as React from "react";
import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import { useForkRef } from "reakit-utils/useForkRef";
import { isButton } from "reakit-utils/isButton";
import { warning } from "reakit-warning";
import {
  ClickableOptions,
  ClickableHTMLProps,
  useClickable,
} from "../Clickable/Clickable";
import { BUTTON_KEYS } from "./__keys";

export const useButton = createHook<ButtonOptions, ButtonHTMLProps>({
  name: "Button",
  compose: useClickable,
  keys: BUTTON_KEYS,

  useProps(_, { ref: htmlRef, ...htmlProps }) {
    const ref = React.useRef<HTMLElement>(null);
    const [role, setRole] = React.useState<"button" | undefined>(undefined);
    const [type, setType] = React.useState<"button" | undefined>("button");

    React.useEffect(() => {
      const element = ref.current;
      if (!element) {
        warning(
          true,
          "Can't determine whether the element is a native button because `ref` wasn't passed to the component",
          "See https://reakit.io/docs/button"
        );
        return;
      }
      if (!isButton(element)) {
        if (element.tagName !== "A") {
          setRole("button");
        }
        setType(undefined);
      }
    }, []);

    return {
      ref: useForkRef(ref, htmlRef),
      role,
      type,
      ...htmlProps,
    };
  },
});

export const Button = createComponent({
  as: "button",
  memo: true,
  useHook: useButton,
});

export type ButtonOptions = ClickableOptions;

export type ButtonHTMLProps = ClickableHTMLProps &
  React.ButtonHTMLAttributes<any>;

export type ButtonProps = ButtonOptions & ButtonHTMLProps;
