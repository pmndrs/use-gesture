import * as React from "react";
import { createPopper, Instance, State } from "@popperjs/core";
import {
  SealedInitialState,
  useSealedState,
} from "reakit-utils/useSealedState";
import { useIsomorphicEffect } from "reakit-utils/useIsomorphicEffect";
import { shallowEqual } from "reakit-utils/shallowEqual";
import { isUA } from "reakit-utils/dom";
import {
  DialogState,
  DialogActions,
  DialogInitialState,
  useDialogState,
  DialogStateReturn,
} from "../Dialog/DialogState";

const isSafari = isUA("Mac") && !isUA("Chrome") && isUA("Safari");

type Placement =
  | "auto-start"
  | "auto"
  | "auto-end"
  | "top-start"
  | "top"
  | "top-end"
  | "right-start"
  | "right"
  | "right-end"
  | "bottom-end"
  | "bottom"
  | "bottom-start"
  | "left-end"
  | "left"
  | "left-start";

export type PopoverState = DialogState & {
  /**
   * The reference element.
   */
  unstable_referenceRef: React.RefObject<HTMLElement | null>;
  /**
   * The popover element.
   * @private
   */
  unstable_popoverRef: React.RefObject<HTMLElement | null>;
  /**
   * The arrow element.
   * @private
   */
  unstable_arrowRef: React.RefObject<HTMLElement | null>;
  /**
   * Popover styles.
   * @private
   */
  unstable_popoverStyles: React.CSSProperties;
  /**
   * Arrow styles.
   * @private
   */
  unstable_arrowStyles: React.CSSProperties;
  /**
   * `placement` passed to the hook.
   * @private
   */
  unstable_originalPlacement: Placement;
  /**
   * @private
   */
  unstable_update: () => boolean;
  /**
   * Actual `placement`.
   */
  placement: Placement;
};

export type PopoverActions = DialogActions & {
  /**
   * Change the `placement` state.
   */
  place: React.Dispatch<React.SetStateAction<Placement>>;
};

export type PopoverInitialState = DialogInitialState &
  Partial<Pick<PopoverState, "placement">> & {
    /**
     * Whether or not the popover should have `position` set to `fixed`.
     */
    unstable_fixed?: boolean;
    /**
     * Flip the popover's placement when it starts to overlap its reference
     * element.
     */
    unstable_flip?: boolean;
    /**
     * Offset between the reference and the popover: [main axis, alt axis]. Should not be combined with `gutter`.
     */
    unstable_offset?: [number | string, number | string];
    /**
     * Offset between the reference and the popover on the main axis. Should not be combined with `unstable_offset`.
     */
    gutter?: number;
    /**
     * Prevents popover from being positioned outside the boundary.
     */
    unstable_preventOverflow?: boolean;
  };

export type PopoverStateReturn = DialogStateReturn &
  PopoverState &
  PopoverActions;

function applyStyles(styles?: Partial<CSSStyleDeclaration>) {
  return (prevStyles: React.CSSProperties) => {
    if (styles && !shallowEqual(prevStyles, styles)) {
      return styles as React.CSSProperties;
    }
    return prevStyles;
  };
}

export function usePopoverState(
  initialState: SealedInitialState<PopoverInitialState> = {}
): PopoverStateReturn {
  const {
    gutter = 12,
    placement: sealedPlacement = "bottom",
    unstable_flip: flip = true,
    unstable_offset: sealedOffset,
    unstable_preventOverflow: preventOverflow = true,
    unstable_fixed: fixed = false,
    modal = false,
    ...sealed
  } = useSealedState(initialState);

  const popper = React.useRef<Instance | null>(null);
  const referenceRef = React.useRef<HTMLElement>(null);
  const popoverRef = React.useRef<HTMLElement>(null);
  const arrowRef = React.useRef<HTMLElement>(null);

  const [originalPlacement, place] = React.useState(sealedPlacement);
  const [placement, setPlacement] = React.useState(sealedPlacement);
  const [offset] = React.useState(sealedOffset || [0, gutter]);
  const [popoverStyles, setPopoverStyles] = React.useState<React.CSSProperties>(
    {
      position: "fixed",
      left: "100%",
      top: "100%",
    }
  );
  const [arrowStyles, setArrowStyles] = React.useState<React.CSSProperties>({});

  const dialog = useDialogState({ modal, ...sealed });

  const update = React.useCallback(() => {
    if (popper.current) {
      popper.current.forceUpdate();
      return true;
    }
    return false;
  }, []);

  const updateState = React.useCallback((state: Partial<State>) => {
    if (state.placement) {
      setPlacement(state.placement);
    }
    if (state.styles) {
      setPopoverStyles(applyStyles(state.styles.popper));
      if (arrowRef.current) {
        setArrowStyles(applyStyles(state.styles.arrow));
      }
    }
  }, []);

  useIsomorphicEffect(() => {
    if (referenceRef.current && popoverRef.current) {
      popper.current = createPopper(referenceRef.current, popoverRef.current, {
        // https://popper.js.org/docs/v2/constructors/#options
        placement: originalPlacement,
        strategy: fixed ? "fixed" : "absolute",
        // Safari needs styles to be applied in the first render, otherwise
        // hovering over the popover when it gets visible for the first time
        // will change its dimensions unexpectedly.
        onFirstUpdate: isSafari ? updateState : undefined,
        modifiers: [
          {
            // https://popper.js.org/docs/v2/modifiers/event-listeners/
            name: "eventListeners",
            enabled: dialog.visible,
          },
          {
            // https://popper.js.org/docs/v2/modifiers/apply-styles/
            name: "applyStyles",
            enabled: false,
          },
          {
            // https://popper.js.org/docs/v2/modifiers/flip/
            name: "flip",
            enabled: flip,
            options: { padding: 8 },
          },
          {
            // https://popper.js.org/docs/v2/modifiers/offset/
            name: "offset",
            options: { offset },
          },
          {
            // https://popper.js.org/docs/v2/modifiers/prevent-overflow/
            name: "preventOverflow",
            enabled: preventOverflow,
            options: {
              tetherOffset: () => arrowRef.current?.clientWidth || 0,
            },
          },
          {
            // https://popper.js.org/docs/v2/modifiers/arrow/
            name: "arrow",
            enabled: !!arrowRef.current,
            options: { element: arrowRef.current },
          },
          {
            // https://popper.js.org/docs/v2/modifiers/#custom-modifiers
            name: "updateState",
            phase: "write",
            requires: ["computeStyles"],
            enabled: dialog.visible && process.env.NODE_ENV !== "test",
            fn: ({ state }) => updateState(state),
          },
        ],
      });
    }
    return () => {
      if (popper.current) {
        popper.current.destroy();
        popper.current = null;
      }
    };
  }, [originalPlacement, fixed, dialog.visible, flip, offset, preventOverflow]);

  // Ensure that the popover will be correctly positioned with an additional
  // update.
  React.useEffect(() => {
    if (!dialog.visible) return undefined;
    const id = window.requestAnimationFrame(() => {
      popper.current?.forceUpdate();
    });
    return () => {
      window.cancelAnimationFrame(id);
    };
  }, [dialog.visible]);

  return {
    ...dialog,
    unstable_referenceRef: referenceRef,
    unstable_popoverRef: popoverRef,
    unstable_arrowRef: arrowRef,
    unstable_popoverStyles: popoverStyles,
    unstable_arrowStyles: arrowStyles,
    unstable_update: update,
    unstable_originalPlacement: originalPlacement,
    placement,
    place,
  };
}
