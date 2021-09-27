import * as React from "react";
import { As, PropsWithAs } from "reakit-utils/types";
import { splitProps } from "reakit-utils/splitProps";
import { shallowEqual } from "reakit-utils/shallowEqual";
import { normalizePropsAreEqual } from "reakit-utils/normalizePropsAreEqual";
import { forwardRef } from "./__utils/forwardRef";
import { useCreateElement as defaultUseCreateElement } from "./useCreateElement";
import { memo } from "./__utils/memo";

type RoleHTMLProps = React.HTMLAttributes<any> &
  React.RefAttributes<any> & {
    wrapElement?: (element: React.ReactNode) => React.ReactNode;
  };

type Hook<O> = {
  (options?: O, props?: RoleHTMLProps): RoleHTMLProps;
  unstable_propsAreEqual?: (prev: O, next: O) => boolean;
  __keys?: ReadonlyArray<any>;
};

type Options<T extends As, O> = {
  as: T;
  useHook?: Hook<O>;
  keys?: ReadonlyArray<any>;
  memo?: boolean;
  propsAreEqual?: (prev: O, next: O) => boolean;
  useCreateElement?: (
    type: T,
    props: Omit<PropsWithAs<O, T>, "as">,
    children?: React.ReactNode
  ) => JSX.Element;
};

export type Component<T extends As, O> = {
  <TT extends As>(props: PropsWithAs<O, TT> & { as: TT }): JSX.Element;
  (props: PropsWithAs<O, T>): JSX.Element;
  displayName?: string;
  unstable_propsAreEqual: (
    prev: PropsWithAs<O, T>,
    next: PropsWithAs<O, T>
  ) => boolean;
  __keys?: ReadonlyArray<any>;
};

/**
 * Creates a React component.
 *
 * @example
 * import { createComponent } from "reakit-system";
 *
 * const A = createComponent({ as: "a" });
 *
 * @param options
 */
export function createComponent<T extends As, O>({
  as: type,
  useHook,
  memo: shouldMemo,
  propsAreEqual = useHook?.unstable_propsAreEqual,
  keys = useHook?.__keys || [],
  useCreateElement = defaultUseCreateElement,
}: Options<T, O>) {
  let Comp = ((
    { as = type, ...props }: PropsWithAs<O, T>,
    ref: React.Ref<T>
  ) => {
    if (useHook) {
      const [options, htmlProps] = splitProps(props, keys);
      const { wrapElement, ...elementProps } = useHook(options, {
        ref,
        ...htmlProps,
      });
      // @ts-ignore
      const asKeys = as.render?.__keys || as.__keys;
      const asOptions = asKeys && splitProps(props, asKeys)[0];
      const allProps = asOptions
        ? { ...elementProps, ...asOptions }
        : elementProps;
      const element = useCreateElement(as, allProps as typeof props);
      if (wrapElement) {
        return wrapElement(element);
      }
      return element;
    }
    return useCreateElement(as, { ref, ...props });
  }) as Component<T, O>;

  if (process.env.NODE_ENV !== "production" && useHook) {
    Comp.displayName = useHook.name.replace(/^(unstable_)?use/, "");
  }

  Comp = forwardRef(Comp);

  if (shouldMemo) {
    Comp = memo(Comp, propsAreEqual && normalizePropsAreEqual(propsAreEqual));
  }

  Comp.__keys = keys;

  Comp.unstable_propsAreEqual = normalizePropsAreEqual(
    propsAreEqual || shallowEqual
  );

  return Comp;
}
