export function findVisibleSubmenu(
  submenus?: Array<React.RefObject<HTMLElement>>
) {
  const visibleSubmenu = submenus?.find(
    (submenu) => submenu.current && !submenu.current.hidden
  );
  return visibleSubmenu?.current;
}
