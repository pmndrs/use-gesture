import * as React from "react";
import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import { useCreateElement } from "reakit-system/useCreateElement";
import { useForkRef } from "reakit-utils/useForkRef";
import { warning, useWarning } from "reakit-warning";
import { getDocument } from "reakit-utils/getDocument";
import { fireBlurEvent } from "reakit-utils/fireBlurEvent";
import { fireKeyboardEvent } from "reakit-utils/fireKeyboardEvent";
import { isSelfTarget } from "reakit-utils/isSelfTarget";
import { useLiveRef } from "reakit-utils/useLiveRef";
import { canUseDOM } from "reakit-utils/canUseDOM";
import { getNextActiveElementOnBlur } from "reakit-utils/getNextActiveElementOnBlur";
import { useTabbable, TabbableOptions, TabbableHTMLProps } from "../Tabbable";
import { useRole } from "../Role/Role";
import { CompositeStateReturn } from "./CompositeState";
import { Item } from "./__utils/types";
import { groupItems } from "./__utils/groupItems";
import { flatten } from "./__utils/flatten";
import { findFirstEnabledItem } from "./__utils/findFirstEnabledItem";
import { reverse } from "./__utils/reverse";
import { getCurrentId } from "./__utils/getCurrentId";
import { findEnabledItemById } from "./__utils/findEnabledItemById";
import { COMPOSITE_KEYS } from "./__keys";
import { userFocus } from "./__utils/userFocus";

export type CompositeOptions = TabbableOptions &
  Pick<
    Partial<CompositeStateReturn>,
    | "baseId"
    | "unstable_virtual"
    | "currentId"
    | "orientation"
    | "unstable_moves"
    | "wrap"
    | "groups"
  > &
  Pick<
    CompositeStateReturn,
    "items" | "setCurrentId" | "first" | "last" | "move"
  >;

export type CompositeHTMLProps = TabbableHTMLProps;

export type CompositeProps = CompositeOptions & CompositeHTMLProps;

const isIE11 = canUseDOM && "msCrypto" in window;

function canProxyKeyboardEvent(event: React.KeyboardEvent) {
  if (!isSelfTarget(event)) return false;
  if (event.metaKey) return false;
  if (event.key === "Tab") return false;
  return true;
}

function useKeyboardEventProxy(
  virtual?: boolean,
  currentItem?: Item,
  htmlEventHandler?: React.KeyboardEventHandler
) {
  const eventHandlerRef = useLiveRef(htmlEventHandler);
  return React.useCallback(
    (event: React.KeyboardEvent) => {
      eventHandlerRef.current?.(event);
      if (event.defaultPrevented) return;
      if (virtual && canProxyKeyboardEvent(event)) {
        const currentElement = currentItem?.ref.current;
        if (currentElement) {
          if (!fireKeyboardEvent(currentElement, event.type, event)) {
            event.preventDefault();
          }
          // The event will be triggered on the composite item and then
          // propagated up to this composite element again, so we can pretend
          // that it wasn't called on this component in the first place.
          if (event.currentTarget.contains(currentElement)) {
            event.stopPropagation();
          }
        }
      }
    },
    [virtual, currentItem]
  );
}

// istanbul ignore next
function useActiveElementRef(elementRef: React.RefObject<HTMLElement>) {
  const activeElementRef = React.useRef<HTMLElement | null>(null);
  React.useEffect(() => {
    const document = getDocument(elementRef.current);
    const onFocus = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      activeElementRef.current = target;
    };
    document.addEventListener("focus", onFocus, true);
    return () => {
      document.removeEventListener("focus", onFocus, true);
    };
  }, []);
  return activeElementRef;
}

function findFirstEnabledItemInTheLastRow(items: Item[]) {
  return findFirstEnabledItem(flatten(reverse(groupItems(items))));
}

function isItem(items: Item[], element?: Element | EventTarget | null) {
  return items?.some((item) => !!element && item.ref.current === element);
}

function useScheduleUserFocus(currentItem?: Item) {
  const currentItemRef = useLiveRef(currentItem);
  const [scheduled, schedule] = React.useReducer((n: number) => n + 1, 0);

  React.useEffect(() => {
    const currentElement = currentItemRef.current?.ref.current;
    if (scheduled && currentElement) {
      userFocus(currentElement);
    }
  }, [scheduled]);

  return schedule;
}

export const useComposite = createHook<CompositeOptions, CompositeHTMLProps>({
  name: "Composite",
  compose: [useTabbable],
  keys: COMPOSITE_KEYS,

  useOptions(options) {
    return { ...options, currentId: getCurrentId(options) };
  },

  useProps(
    options,
    {
      ref: htmlRef,
      onFocusCapture: htmlOnFocusCapture,
      onFocus: htmlOnFocus,
      onBlurCapture: htmlOnBlurCapture,
      onKeyDown: htmlOnKeyDown,
      onKeyDownCapture: htmlOnKeyDownCapture,
      onKeyUpCapture: htmlOnKeyUpCapture,
      ...htmlProps
    }
  ) {
    const ref = React.useRef<HTMLElement>(null);
    const currentItem = findEnabledItemById(options.items, options.currentId);
    const previousElementRef = React.useRef<HTMLElement | null>(null);
    const onFocusCaptureRef = useLiveRef(htmlOnFocusCapture);
    const onFocusRef = useLiveRef(htmlOnFocus);
    const onBlurCaptureRef = useLiveRef(htmlOnBlurCapture);
    const onKeyDownRef = useLiveRef(htmlOnKeyDown);
    const scheduleUserFocus = useScheduleUserFocus(currentItem);
    // IE 11 doesn't support event.relatedTarget, so we use the active element
    // ref instead.
    const activeElementRef = isIE11 ? useActiveElementRef(ref) : undefined;

    React.useEffect(() => {
      const element = ref.current;
      if (options.unstable_moves && !currentItem) {
        warning(
          !element,
          "Can't focus composite component because `ref` wasn't passed to component.",
          "See https://reakit.io/docs/composite"
        );
        // If composite.move(null) has been called, the composite container
        // will receive focus.
        element?.focus();
      }
    }, [options.unstable_moves, currentItem]);

    const onKeyDownCapture = useKeyboardEventProxy(
      options.unstable_virtual,
      currentItem,
      htmlOnKeyDownCapture
    );

    const onKeyUpCapture = useKeyboardEventProxy(
      options.unstable_virtual,
      currentItem,
      htmlOnKeyUpCapture
    );

    const onFocusCapture = React.useCallback(
      (event: React.FocusEvent) => {
        onFocusCaptureRef.current?.(event);
        if (event.defaultPrevented) return;
        if (!options.unstable_virtual) return;
        // IE11 doesn't support event.relatedTarget, so we use the active
        // element ref instead.
        const previousActiveElement =
          activeElementRef?.current ||
          (event.relatedTarget as HTMLElement | null);
        const previousActiveElementWasItem = isItem(
          options.items,
          previousActiveElement
        );
        if (isSelfTarget(event) && previousActiveElementWasItem) {
          // Composite has been focused as a result of an item receiving focus.
          // The composite item will move focus back to the composite
          // container. In this case, we don't want to propagate this
          // additional event nor call the onFocus handler passed to
          // <Composite onFocus={...} />.
          event.stopPropagation();
          // We keep track of the previous active item element so we can
          // manually fire a blur event on it later when the focus is moved to
          // another item on the onBlurCapture event below.
          previousElementRef.current = previousActiveElement;
        }
      },
      [options.unstable_virtual, options.items]
    );

    const onFocus = React.useCallback(
      (event: React.FocusEvent) => {
        onFocusRef.current?.(event);
        if (event.defaultPrevented) return;
        if (options.unstable_virtual) {
          if (isSelfTarget(event)) {
            // This means that the composite element has been focused while the
            // composite item has not. For example, by clicking on the
            // composite element without touching any item, or by tabbing into
            // the composite element. In this case, we want to trigger focus on
            // the item, just like it would happen with roving tabindex.
            // When it receives focus, the composite item will put focus back
            // on the composite element, in which case hasItemWithFocus will be
            // true.
            scheduleUserFocus();
          }
        } else if (isSelfTarget(event)) {
          // When the roving tabindex composite gets intentionally focused (for
          // example, by clicking directly on it, and not on an item), we make
          // sure to set the current id to null (which means the composite
          // itself is focused).
          options.setCurrentId?.(null);
        }
      },
      [options.unstable_virtual, options.setCurrentId]
    );

    const onBlurCapture = React.useCallback(
      (event: React.FocusEvent) => {
        onBlurCaptureRef.current?.(event);
        if (event.defaultPrevented) return;
        if (!options.unstable_virtual) return;
        // When virtual is set to true, we move focus from the composite
        // container (this component) to the composite item that is being
        // selected. Then we move focus back to the composite container. This
        // is so we can provide the same API as the roving tabindex method,
        // which means people can attach onFocus/onBlur handlers on the
        // CompositeItem component regardless of whether it's virtual or not.
        // This sequence of blurring and focusing items and composite may be
        // confusing, so we ignore intermediate focus and blurs by stopping its
        // propagation and not calling the passed onBlur handler (htmlOnBlur).
        const currentElement = currentItem?.ref.current || null;
        const nextActiveElement = getNextActiveElementOnBlur(event);
        const nextActiveElementIsItem = isItem(
          options.items,
          nextActiveElement
        );
        if (isSelfTarget(event) && nextActiveElementIsItem) {
          // This is an intermediate blur event: blurring the composite
          // container to focus an item (nextActiveElement).
          if (nextActiveElement === currentElement) {
            // The next active element will be the same as the current item in
            // the state in two scenarios:
            //   - Moving focus with keyboard: the state is updated before the
            // blur event is triggered, so here the current item is already
            // pointing to the next active element.
            //   - Clicking on the current active item with a pointer: this
            // will trigger blur on the composite element and then the next
            // active element will be the same as the current item. Clicking on
            // an item other than the current one doesn't end up here as the
            // currentItem state will be updated only after it.
            if (
              previousElementRef.current &&
              previousElementRef.current !== nextActiveElement
            ) {
              // If there's a previous active item and it's not a click action,
              // then we fire a blur event on it so it will work just like if
              // it had DOM focus before (like when using roving tabindex).
              fireBlurEvent(previousElementRef.current, event);
            }
          } else if (currentElement) {
            // This will be true when the next active element is not the
            // current element, but there's a current item. This will only
            // happen when clicking with a pointer on a different item, when
            // there's already an item selected, in which case currentElement
            // is the item that is getting blurred, and nextActiveElement is
            // the item that is being clicked.
            fireBlurEvent(currentElement, event);
          }
          // We want to ignore intermediate blur events, so we stop its
          // propagation and return early so onFocus will not be called.
          event.stopPropagation();
        } else {
          const targetIsItem = isItem(options.items, event.target);
          if (!targetIsItem && currentElement) {
            // If target is not a composite item, it may be the composite
            // element itself (isSelfTarget) or a tabbable element inside the
            // composite widget. This may be triggered by clicking outside the
            // composite widget or by tabbing out of it. In either cases we
            // want to fire a blur event on the current item.
            fireBlurEvent(currentElement, event);
          }
        }
      },
      [options.unstable_virtual, options.items, currentItem]
    );

    const onKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLElement>) => {
        onKeyDownRef.current?.(event);
        if (event.defaultPrevented) return;
        if (options.currentId !== null) return;
        if (!isSelfTarget(event)) return;
        const isVertical = options.orientation !== "horizontal";
        const isHorizontal = options.orientation !== "vertical";
        const isGrid = !!options.groups?.length;
        const up = () => {
          if (isGrid) {
            const item = findFirstEnabledItemInTheLastRow(options.items);
            if (item?.id) {
              options.move?.(item.id);
            }
          } else {
            options.last?.();
          }
        };
        const keyMap = {
          ArrowUp: (isGrid || isVertical) && up,
          ArrowRight: (isGrid || isHorizontal) && options.first,
          ArrowDown: (isGrid || isVertical) && options.first,
          ArrowLeft: (isGrid || isHorizontal) && options.last,
          Home: options.first,
          End: options.last,
          PageUp: options.first,
          PageDown: options.last,
        };
        const action = keyMap[event.key as keyof typeof keyMap];
        if (action) {
          event.preventDefault();
          action();
        }
      },
      [
        options.currentId,
        options.orientation,
        options.groups,
        options.items,
        options.move,
        options.last,
        options.first,
      ]
    );

    return {
      ref: useForkRef(ref, htmlRef),
      id: options.baseId,
      onFocus,
      onFocusCapture,
      onBlurCapture,
      onKeyDownCapture,
      onKeyDown,
      onKeyUpCapture,
      "aria-activedescendant": options.unstable_virtual
        ? currentItem?.id || undefined
        : undefined,
      ...htmlProps,
    };
  },

  useComposeProps(options, htmlProps) {
    htmlProps = useRole(options, htmlProps, true);
    const tabbableHTMLProps = useTabbable(options, htmlProps, true);
    if (options.unstable_virtual || options.currentId === null) {
      // Composite will only be tabbable by default if the focus is managed
      // using aria-activedescendant, which requires DOM focus on the container
      // element (the composite)
      return { tabIndex: 0, ...tabbableHTMLProps };
    }
    return { ...htmlProps, ref: tabbableHTMLProps.ref };
  },
});

export const Composite = createComponent({
  as: "div",
  useHook: useComposite,
  useCreateElement: (type, props, children) => {
    useWarning(
      !props["aria-label"] && !props["aria-labelledby"],
      "You should provide either `aria-label` or `aria-labelledby` props.",
      "See https://reakit.io/docs/composite"
    );
    return useCreateElement(type, props, children);
  },
});
