import * as React from "react";
import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import { useForkRef } from "reakit-utils/useForkRef";
import { useIsomorphicEffect } from "reakit-utils/useIsomorphicEffect";
import { GroupOptions, GroupHTMLProps, useGroup } from "../Group/Group";
import {
  unstable_useId,
  unstable_IdOptions,
  unstable_IdHTMLProps,
} from "../Id/Id";
import { CompositeStateReturn } from "./CompositeState";
import { findEnabledItemById } from "./__utils/findEnabledItemById";
import { COMPOSITE_GROUP_KEYS } from "./__keys";

export type CompositeGroupOptions = GroupOptions &
  unstable_IdOptions &
  Pick<CompositeStateReturn, "registerGroup" | "unregisterGroup"> &
  Pick<Partial<CompositeStateReturn>, "currentId" | "unstable_moves" | "items">;

export type CompositeGroupHTMLProps = GroupHTMLProps & unstable_IdHTMLProps;

export type CompositeGroupProps = CompositeGroupOptions &
  CompositeGroupHTMLProps;

export const useCompositeGroup = createHook<
  CompositeGroupOptions,
  CompositeGroupHTMLProps
>({
  name: "CompositeGroup",
  compose: [useGroup, unstable_useId],
  keys: COMPOSITE_GROUP_KEYS,

  propsAreEqual(prev, next) {
    if (!next.id || prev.id !== next.id) {
      return useGroup.unstable_propsAreEqual(prev, next);
    }
    const {
      currentId: prevCurrentId,
      unstable_moves: prevMoves,
      ...prevProps
    } = prev;
    const {
      currentId: nextCurrentId,
      unstable_moves: nextMoves,
      ...nextProps
    } = next;
    if (prev.items && next.items) {
      const prevCurrentItem = findEnabledItemById(prev.items, prevCurrentId);
      const nextCurrentItem = findEnabledItemById(next.items, nextCurrentId);
      const prevGroupId = prevCurrentItem?.groupId;
      const nextGroupId = nextCurrentItem?.groupId;
      if (next.id === nextGroupId || next.id === prevGroupId) {
        return false;
      }
    }
    return useGroup.unstable_propsAreEqual(prevProps, nextProps);
  },

  useProps(options, { ref: htmlRef, ...htmlProps }) {
    const ref = React.useRef<HTMLElement>(null);
    const { id } = options;

    // We need this to be called before CompositeItems' register
    useIsomorphicEffect(() => {
      if (!id) return undefined;
      options.registerGroup?.({ id, ref });
      return () => {
        options.unregisterGroup?.(id);
      };
    }, [id, options.registerGroup, options.unregisterGroup]);

    return { ref: useForkRef(ref, htmlRef), ...htmlProps };
  },
});

export const CompositeGroup = createComponent({
  as: "div",
  useHook: useCompositeGroup,
});
