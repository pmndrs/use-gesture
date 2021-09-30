import * as React from "react";
import { removeItemFromArray } from "reakit-utils/removeItemFromArray";
import { MenuBarOptions } from "../MenuBar";
import { MenuOptions } from "../Menu";

type Ref = React.RefObject<HTMLElement>;

export type MenuContextType = Pick<
  MenuBarOptions,
  "orientation" | "next" | "previous"
> & {
  ref: Ref;
  role: string;
  parent?: MenuContextType | null;
  children: Array<Ref>;
  addChild: (ref: Ref) => void;
  removeChild: (ref: Ref) => void;
};

export const MenuContext = React.createContext<MenuContextType | null>(null);

export function useMenuContext(
  menuRef: Ref,
  role: string,
  options: MenuBarOptions | MenuOptions
) {
  const orphan = "unstable_orphan" in options && options.unstable_orphan;
  const parent = React.useContext(MenuContext);
  const [children, setChildren] = React.useState<Array<Ref>>([]);
  const { addChild: addChildToParent, removeChild: removeChildFromParent } =
    parent || {};

  const addChild = React.useCallback(
    (ref: Ref) => setChildren((refs) => [...refs, ref]),
    []
  );
  const removeChild = React.useCallback(
    (ref: Ref) => setChildren((refs) => removeItemFromArray(refs, ref)),
    []
  );

  // If it's a nested menu, add it to parent
  React.useEffect(() => {
    if (!addChildToParent || orphan) return undefined;
    addChildToParent(menuRef);
    return () => {
      removeChildFromParent?.(menuRef);
    };
  }, [menuRef, addChildToParent, removeChildFromParent, orphan]);

  const providerValue = React.useMemo<MenuContextType>(
    () => ({
      orientation: options.orientation,
      next: options.next,
      previous: options.previous,
      ref: menuRef,
      role,
      parent,
      children,
      addChild,
      removeChild,
    }),
    [
      options.orientation,
      options.next,
      options.previous,
      menuRef,
      role,
      parent,
      children,
      addChild,
      removeChild,
    ]
  );

  const wrapElement = React.useCallback(
    (element: React.ReactNode) => (
      <MenuContext.Provider value={providerValue}>
        {element}
      </MenuContext.Provider>
    ),
    [providerValue]
  );

  return wrapElement;
}
