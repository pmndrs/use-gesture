import * as React from "react";
import {
  SealedInitialState,
  useSealedState,
} from "reakit-utils/useSealedState";
import {
  PopoverState,
  PopoverActions,
  PopoverInitialState,
  usePopoverState,
  PopoverStateReturn,
} from "../Popover/PopoverState";
import {
  MenuBarState,
  MenuBarActions,
  MenuBarInitialState,
  useMenuBarState,
  MenuBarStateReturn,
} from "./MenuBarState";
import { MenuContext } from "./__utils/MenuContext";

export type MenuState = MenuBarState & PopoverState;

export type MenuActions = MenuBarActions & PopoverActions;

export type MenuInitialState = MenuBarInitialState & PopoverInitialState;

export type MenuStateReturn = MenuBarStateReturn &
  PopoverStateReturn &
  MenuState &
  MenuActions;

export function useMenuState(
  initialState: SealedInitialState<MenuInitialState> = {}
): MenuStateReturn {
  const parent = React.useContext(MenuContext);
  const { orientation = "vertical", gutter = 0, ...sealed } = useSealedState(
    initialState
  );

  const placement =
    sealed.placement ||
    (parent && parent.orientation === "vertical"
      ? "right-start"
      : "bottom-start");

  const menuBar = useMenuBarState({ ...sealed, orientation });
  const popover = usePopoverState({
    ...sealed,
    placement,
    gutter,
  });

  React.useEffect(() => {
    if (!popover.visible) {
      menuBar.reset();
    }
  }, [popover.visible, menuBar.reset]);

  return {
    ...menuBar,
    ...popover,
  };
}
