import * as React from "react";
import {
  useSealedState,
  SealedInitialState,
} from "reakit-utils/useSealedState";
import { useIsomorphicEffect } from "reakit-utils/useIsomorphicEffect";
import { warning } from "reakit-warning";
import {
  unstable_IdState,
  unstable_IdActions,
  unstable_IdInitialState,
  unstable_useIdState,
} from "../Id/IdState";

export type DisclosureState = unstable_IdState & {
  /**
   * Whether it's visible or not.
   */
  visible: boolean;
  /**
   * If `true`, `animating` will be set to `true` when `visible` is updated.
   * It'll wait for `stopAnimation` to be called or a CSS transition ends.
   * If `animated` is set to a `number`, `stopAnimation` will be called only
   * after the same number of milliseconds have passed.
   */
  animated: boolean | number;
  /**
   * Whether it's animating or not.
   */
  animating: boolean;
};

export type DisclosureActions = unstable_IdActions & {
  /**
   * Changes the `visible` state to `true`
   */
  show: () => void;
  /**
   * Changes the `visible` state to `false`
   */
  hide: () => void;
  /**
   * Toggles the `visible` state
   */
  toggle: () => void;
  /**
   * Sets `visible`.
   */
  setVisible: React.Dispatch<React.SetStateAction<DisclosureState["visible"]>>;
  /**
   * Sets `animated`.
   */
  setAnimated: React.Dispatch<
    React.SetStateAction<DisclosureState["animated"]>
  >;
  /**
   * Stops animation. It's called automatically if there's a CSS transition.
   */
  stopAnimation: () => void;
};

export type DisclosureInitialState = unstable_IdInitialState &
  Partial<Pick<DisclosureState, "visible" | "animated">>;

export type DisclosureStateReturn = DisclosureState & DisclosureActions;

function useLastValue<T>(value: T) {
  const lastValue = React.useRef<T | null>(null);
  useIsomorphicEffect(() => {
    lastValue.current = value;
  }, [value]);
  return lastValue;
}

export function useDisclosureState(
  initialState: SealedInitialState<DisclosureInitialState> = {}
): DisclosureStateReturn {
  const {
    visible: initialVisible = false,
    animated: initialAnimated = false,
    ...sealed
  } = useSealedState(initialState);

  const id = unstable_useIdState(sealed);

  const [visible, setVisible] = React.useState(initialVisible);
  const [animated, setAnimated] = React.useState(initialAnimated);
  const [animating, setAnimating] = React.useState(false);
  const lastVisible = useLastValue(visible);

  const visibleHasChanged =
    lastVisible.current != null && lastVisible.current !== visible;

  if (animated && !animating && visibleHasChanged) {
    // Sets animating to true when when visible is updated
    setAnimating(true);
  }

  React.useEffect(() => {
    if (typeof animated === "number" && animating) {
      const timeout = setTimeout(() => setAnimating(false), animated);
      return () => {
        clearTimeout(timeout);
      };
    }
    if (animated && animating && process.env.NODE_ENV === "development") {
      const timeout = setTimeout(() => {
        warning(
          animating,
          "It's been 8 seconds but stopAnimation has not been called. Does the disclousure element have a CSS transition?"
        );
      }, 8000);
      return () => {
        clearTimeout(timeout);
      };
    }
    return () => {};
  }, [animated, animating]);

  const show = React.useCallback(() => setVisible(true), []);
  const hide = React.useCallback(() => setVisible(false), []);
  const toggle = React.useCallback(() => setVisible((v) => !v), []);
  const stopAnimation = React.useCallback(() => setAnimating(false), []);

  return {
    ...id,
    visible,
    animated,
    animating,
    show,
    hide,
    toggle,
    setVisible,
    setAnimated,
    stopAnimation,
  };
}
