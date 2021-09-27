---
path: /docs/menu/
---

# Menu

Accessible dropdown `Menu` component that follows the [WAI-ARIA Menu or Menu bar Pattern](https://www.w3.org/TR/wai-aria-practices/#menu). It also includes a `MenuButton` component that follows the [WAI-ARIA Menu Button Pattern](https://www.w3.org/TR/wai-aria-practices/#menubutton).

<carbon-ad></carbon-ad>

## Installation

```sh
npm install reakit
```

Learn more in [Get started](/docs/get-started/).

## Usage

```jsx
import {
  useMenuState,
  Menu,
  MenuItem,
  MenuButton,
  MenuSeparator,
} from "reakit/Menu";

function Example() {
  const menu = useMenuState();
  return (
    <>
      <MenuButton {...menu}>Preferences</MenuButton>
      <Menu {...menu} aria-label="Preferences">
        <MenuItem {...menu}>Settings</MenuItem>
        <MenuItem {...menu} disabled>
          Extensions
        </MenuItem>
        <MenuSeparator {...menu} />
        <MenuItem {...menu}>Keyboard shortcuts</MenuItem>
      </Menu>
    </>
  );
}
```

### Menu actions

You can use either `onClick` or `href` props on `MenuItem` to define menu actions.

<!-- eslint-disable no-console -->

```jsx
import {
  useMenuState,
  Menu,
  MenuItem,
  MenuButton,
  MenuSeparator,
} from "reakit/Menu";

function Example() {
  const menu = useMenuState();

  return (
    <>
      <MenuButton {...menu}>Menu</MenuButton>
      <Menu {...menu} aria-label="Example">
        <MenuItem
          {...menu}
          onClick={() => {
            menu.hide();
            console.log("clicked on button");
          }}
        >
          Button
        </MenuItem>
        <MenuItem {...menu} as="a" href="#" onClick={menu.hide}>
          Link
        </MenuItem>
      </Menu>
    </>
  );
}
```

### Initial focus

When opening `Menu`, focus is usually set on the first `MenuItem`. You can set the initial focus to be the menu container itself by just passing `tabIndex={0}` to it. This will be ignored if the menu is opened by using arrow keys.

```jsx
import { useMenuState, Menu, MenuItem, MenuButton } from "reakit/Menu";

function Example() {
  const menu = useMenuState();
  return (
    <>
      <MenuButton {...menu}>Preferences</MenuButton>
      <Menu {...menu} tabIndex={0} aria-label="Preferences">
        <MenuItem {...menu}>Settings</MenuItem>
        <MenuItem {...menu}>Extensions</MenuItem>
        <MenuItem {...menu}>Keyboard shortcuts</MenuItem>
      </Menu>
    </>
  );
}
```

Alternatively, you can define another element to get the initial focus with React hooks:

```jsx
import React from "react";
import { Button } from "reakit/Button";
import { useMenuState, Menu, MenuItem, MenuButton } from "reakit/Menu";

function Example() {
  const menu = useMenuState();
  const ref = React.useRef();

  React.useEffect(() => {
    if (menu.visible) {
      ref.current.focus();
    }
  }, [menu.visible]);

  return (
    <>
      <MenuButton {...menu}>Preferences</MenuButton>
      <Menu {...menu} aria-label="Preferences">
        <MenuItem {...menu}>Settings</MenuItem>
        <MenuItem {...menu} ref={ref}>
          Extensions
        </MenuItem>
        <MenuItem {...menu}>Keyboard shortcuts</MenuItem>
      </Menu>
    </>
  );
}
```

### Submenu

`Menu` can be used independently or nested within another one.

```jsx
import React from "react";
import {
  useMenuState,
  Menu,
  MenuItem,
  MenuButton,
  MenuSeparator,
} from "reakit/Menu";

const PreferencesMenu = React.forwardRef((props, ref) => {
  const menu = useMenuState();
  return (
    <>
      <MenuButton ref={ref} {...menu} {...props}>
        Preferences
      </MenuButton>
      <Menu {...menu} aria-label="Preferences">
        <MenuItem {...menu}>Settings</MenuItem>
        <MenuItem {...menu} disabled>
          Extensions
        </MenuItem>
        <MenuSeparator {...menu} />
        <MenuItem {...menu}>Keyboard shortcuts</MenuItem>
      </Menu>
    </>
  );
});

function Example() {
  const menu = useMenuState();
  return (
    <>
      <MenuButton {...menu}>Code</MenuButton>
      <Menu {...menu} aria-label="Code">
        <MenuItem {...menu}>About Visual Studio Code</MenuItem>
        <MenuItem {...menu}>Check for Updates...</MenuItem>
        <MenuSeparator {...menu} />
        <MenuItem {...menu} as={PreferencesMenu} />
      </Menu>
    </>
  );
}
```

### Menu with dialog

Reakit is built with composition in mind! You can compose any other component with `Menu`. You can nest [Dialog](/docs/dialog/)s inside it by using the same approach described on [Submenu](#submenu).

```jsx
import React from "react";
import { Button } from "reakit/Button";
import {
  useDialogState,
  Dialog,
  DialogDisclosure,
  DialogBackdrop,
} from "reakit/Dialog";
import {
  useMenuState,
  Menu,
  MenuItem,
  MenuButton,
  MenuSeparator,
} from "reakit/Menu";

const UpdatesDialog = React.forwardRef((props, ref) => {
  const dialog = useDialogState();
  return (
    <>
      <DialogDisclosure ref={ref} {...dialog} {...props}>
        Check for Updates...
      </DialogDisclosure>
      <Dialog {...dialog} aria-label="Check for Updates">
        <p>There are currently no updates available.</p>
        <Button onClick={dialog.hide}>OK</Button>
      </Dialog>
    </>
  );
});

function Example() {
  const menu = useMenuState();
  return (
    <>
      <MenuButton {...menu}>Code</MenuButton>
      <Menu {...menu} aria-label="Code">
        <MenuItem {...menu}>About Visual Studio Code</MenuItem>
        <MenuItem {...menu} as={UpdatesDialog} />
        <MenuSeparator {...menu} />
        <MenuItem {...menu}>Preferences</MenuItem>
      </Menu>
    </>
  );
}
```

### Menu bar

You can combine multiple `Menu`s to compose a `MenuBar` by using the same approach described on [Submenu](#submenu). Each `Menu` can be used separately or in combination with others.

```jsx
import React from "react";
import {
  useMenuState,
  useMenuBarState,
  Menu,
  MenuButton,
  MenuItem,
  MenuSeparator,
  MenuBar,
  MenuGroup,
  MenuItemCheckbox,
  MenuItemRadio,
} from "reakit/Menu";

// OPEN RECENT
const OpenRecentMenu = React.forwardRef((props, ref) => {
  const menu = useMenuState();
  return (
    <>
      <MenuButton ref={ref} {...menu} {...props}>
        Open Recent
      </MenuButton>
      <Menu {...menu} aria-label="Open Recent">
        <MenuItem {...menu}>Reopen Closed Editor</MenuItem>
        <MenuSeparator {...menu} />
        <MenuItem {...menu}>More...</MenuItem>
        <MenuSeparator {...menu} />
        <MenuItem {...menu}>Clear Recently Opened</MenuItem>
      </Menu>
    </>
  );
});

// FILE
const FileMenu = React.forwardRef((props, ref) => {
  const menu = useMenuState();
  return (
    <>
      <MenuButton ref={ref} {...menu} {...props}>
        File
      </MenuButton>
      <Menu {...menu} aria-label="File">
        <MenuItem {...menu}>New File</MenuItem>
        <MenuItem {...menu}>New Window</MenuItem>
        <MenuSeparator {...menu} />
        <MenuItem {...menu}>Open...</MenuItem>
        <MenuItem {...menu}>Open Workspace...</MenuItem>
        <MenuItem {...menu} as={OpenRecentMenu} />
      </Menu>
    </>
  );
});

// EDIT
const EditMenu = React.forwardRef((props, ref) => {
  const menu = useMenuState();
  return (
    <>
      <MenuButton ref={ref} {...menu} {...props}>
        Edit
      </MenuButton>
      <Menu {...menu} aria-label="Edit">
        <MenuItem {...menu}>Undo</MenuItem>
        <MenuItem {...menu}>Redo</MenuItem>
        <MenuSeparator {...menu} />
        <MenuItem {...menu}>Cut</MenuItem>
        <MenuItem {...menu}>Copy</MenuItem>
        <MenuItem {...menu}>Paste</MenuItem>
      </Menu>
    </>
  );
});

// VIEW
const ViewMenu = React.forwardRef((props, ref) => {
  const menu = useMenuState();
  return (
    <>
      <MenuButton ref={ref} {...menu} {...props}>
        View
      </MenuButton>
      <Menu {...menu} aria-label="View">
        <MenuGroup {...menu}>
          <MenuItemRadio {...menu} name="windows" value="explorer">
            Explorer
          </MenuItemRadio>
          <MenuItemRadio {...menu} name="windows" value="search">
            Search
          </MenuItemRadio>
          <MenuItemRadio {...menu} name="windows" value="debug">
            Debug
          </MenuItemRadio>
          <MenuItemRadio {...menu} name="windows" value="extensions">
            Extensions
          </MenuItemRadio>
        </MenuGroup>
        <MenuSeparator {...menu} />
        <MenuItemCheckbox {...menu} name="toggles" value="word-wrap">
          Toggle Word Wrap
        </MenuItemCheckbox>
        <MenuItemCheckbox {...menu} name="toggles" value="minimap">
          Toggle Minimap
        </MenuItemCheckbox>
        <MenuItemCheckbox {...menu} name="toggles" value="breadcrumbs">
          Toggle Breadcrumbs
        </MenuItemCheckbox>
      </Menu>
    </>
  );
});

function Example() {
  const menu = useMenuBarState();
  return (
    <MenuBar {...menu}>
      <MenuItem {...menu} as={FileMenu} />
      <MenuItem {...menu} as={EditMenu} />
      <MenuItem {...menu} as={ViewMenu} />
    </MenuBar>
  );
}
```

### Animating

`Menu` uses [Popover](/docs/popover/) underneath, so you can use the same approaches as described in the [Animating](/docs/popover/#animating) section there.

```jsx
import { css } from "emotion";
import { useMenuState, Menu, MenuItem, MenuButton } from "reakit/Menu";

const styles = css`
  display: flex;
  flex-direction: column;
  background: white;
  transition: opacity 250ms ease-in-out, transform 250ms ease-in-out;
  opacity: 0;
  transform-origin: top center;
  transform: scaleY(0);
  [data-enter] & {
    opacity: 1;
    transform: scaleY(1);
  }
`;

function Example() {
  const menu = useMenuState({ animated: 250 });
  return (
    <>
      <MenuButton {...menu}>Preferences</MenuButton>
      <Menu
        {...menu}
        aria-label="Preferences"
        style={{ border: 0, background: "none", padding: 0 }}
      >
        <div className={styles}>
          <MenuItem {...menu}>Item 1</MenuItem>
          <MenuItem {...menu}>Item 2</MenuItem>
          <MenuItem {...menu}>Item 3</MenuItem>
        </div>
      </Menu>
    </>
  );
}
```

### Abstracting

You can build your own `Menu` component with a different API on top of Reakit.

Be careful not to accidentally shadow props coming in from the menu state.

```jsx
import React from "react";
import {
  useMenuState,
  Menu as BaseMenu,
  MenuItem,
  MenuButton,
  MenuSeparator,
} from "reakit/Menu";

const Menu = React.forwardRef(
  ({ disclosure, menuItems, menuProps, ...props }, ref) => {
    const menu = useMenuState();
    return (
      <>
        <MenuButton ref={ref} {...menu} {...props} {...disclosure.props}>
          {(disclosureProps) => React.cloneElement(disclosure, disclosureProps)}
        </MenuButton>
        <BaseMenu {...menu} {...menuProps}>
          {menuItems.map((item, i) => {
            if (item.type === MenuSeparator) {
              return React.cloneElement(item, {
                ...menu,
                key: item.key || i,
                ...item.props,
              });
            }
            return (
              <MenuItem {...menu} {...item.props} key={item.key || i}>
                {(itemProps) => React.cloneElement(item, itemProps)}
              </MenuItem>
            );
          })}
        </BaseMenu>
      </>
    );
  }
);

function Example() {
  return (
    <Menu
      menuProps={{ "aria-label": "Custom menu" }}
      disclosure={<button>Custom menu</button>}
      menuItems={[
        <button>Custom item 1</button>,
        <button>Custom item 2</button>,
        <button>Custom item 3</button>,
        <MenuSeparator />,
        <Menu
          menuProps={{ "aria-label": "Sub Menu" }}
          disclosure={<button>Sub Menu</button>}
          menuItems={[
            <button>Custom item 4</button>,
            <button>Custom item 5</button>,
          ]}
        />,
      ]}
    />
  );
}
```

## Performance

If you notice performance issues when rendering several `MenuItem`s, you can do the following:

1. Pass an `id` prop to each `MenuItem`.
2. Memoize all non-primitive props that you're passing to `MenuItem`, including event handlers (e.g. `onClick`) and the `children` prop.

`MenuItem` will compare the passed `id` with `menu.currentId` and, if the other props haven't been changed, it'll only re-render if it's the previous or the current active item.

<!-- eslint-disable no-alert -->

```jsx
import React from "react";
import { useMenuState, Menu, MenuButton, MenuItem } from "reakit/Menu";

const items = Array.from({ length: 25 }).map((_, i) => `item-${i}`);

function Example() {
  const menu = useMenuState({ loop: true });
  const onClick = React.useCallback((event) => {
    window.alert(event.currentTarget.id);
  }, []);
  // If children aren't primitive values (like strings), memoize them with
  // React.useCallback
  const children = React.useCallback(
    (itemProps) => (
      <span {...itemProps}>
        <span>{itemProps.id}</span>
      </span>
    ),
    []
  );
  return (
    <>
      <MenuButton {...menu}>Performance</MenuButton>
      <Menu {...menu} aria-label="Performance">
        {items.map((id) => (
          <MenuItem {...menu} key={id} id={id} onClick={onClick}>
            {children}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
```

## Accessibility

- `Menu` has role `menu`.
- `MenuBar` has role `menubar`.
- `Menu` and `MenuBar` extend the accessibility features of [Composite](/docs/composite/#accessibility).
- `MenuButton` extends the accessibility features of [PopoverDisclosure](/docs/popover/#accessibility), which means it sets `aria-haspopup` and `aria-expanded` attributes accordingly.
- `MenuItem` has role `menuitem`.
- `MenuItem` extends the accessibility features of [CompositeItem](/docs/composite/), which means it uses the [roving tabindex](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_roving_tabindex) method to manage focus.
- `MenuItemCheckbox` has role `menuitemcheckbox`.
- `MenuItemRadio` has role `menuitemradio`.
- Pressing <kbd>Enter</kbd> on `MenuButton` opens its menu (or submenu) and places focus on its first item.
- Pressing <kbd>Space</kbd> on `MenuItemCheckbox` changes the state without closing `Menu`.
- Pressing <kbd>Space</kbd> on a `MenuItemRadio` that is not checked, without closing `Menu`, checks the focused `MenuItemRadio` and unchecks any other checked `MenuItemRadio` in the same group.
- Pressing any key that corresponds to a printable character moves focus to the next `MenuItem` in the current `Menu` or `MenuBar` whose label begins with that printable character.

Learn more in [Accessibility](/docs/accessibility/).

## Composition

- `Menu` uses `MenuBar` and [Popover](/docs/popover/).
- `MenuArrow` uses [PopoverArrow](/docs/popover/).
- `MenuButton` uses [PopoverDisclosure](/docs/popover/).
- `MenuGroup` uses [Role](/docs/role/).
- `MenuItem` uses [CompositeItem](/docs/composite/).
- `MenuItemCheckbox` uses `MenuItem` and [Checkbox](/docs/checkbox/).
- `MenuItemRadio` uses `MenuItem` and [Radio](/docs/radio/).
- `MenuSeparator` uses [Separator](/docs/separator/).
- `MenuBar` uses [Composite](/docs/composite/).

Learn more in [Composition](/docs/composition/#props-hooks).

## Props

<!-- Automatically generated -->

### `useMenuBarState`

- **`baseId`**
  <code>string</code>

  ID that will serve as a base for all the items IDs.

- **`unstable_virtual`** <span title="Experimental">⚠️</span>
  <code>boolean</code>

  If enabled, the composite element will act as an
[aria-activedescendant](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_focus_activedescendant)
container instead of
[roving tabindex](https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex).
DOM focus will remain on the composite while its items receive virtual focus.

- **`rtl`**
  <code>boolean</code>

  Determines how `next` and `previous` functions will behave. If `rtl` is
set to `true`, they will be inverted. This only affects the composite
widget behavior. You still need to set `dir="rtl"` on HTML/CSS.

- **`orientation`**
  <code>&#34;horizontal&#34; | &#34;vertical&#34; | undefined</code>

  Defines the orientation of the composite widget. If the composite has a
single row or column (one-dimensional), the `orientation` value determines
which arrow keys can be used to move focus:
  - `undefined`: all arrow keys work.
  - `horizontal`: only left and right arrow keys work.
  - `vertical`: only up and down arrow keys work.

  It doesn't have any effect on two-dimensional composites.

- **`currentId`**
  <code>string | null | undefined</code>

  The current focused item `id`.
  - `undefined` will automatically focus the first enabled composite item.
  - `null` will focus the base composite element and users will be able to
navigate out of it using arrow keys.
  - If `currentId` is initially set to `null`, the base composite element
itself will have focus and users will be able to navigate to it using
arrow keys.

- **`loop`**
  <code>boolean | &#34;horizontal&#34; | &#34;vertical&#34;</code>

  On one-dimensional composites:
  - `true` loops from the last item to the first item and vice-versa.
  - `horizontal` loops only if `orientation` is `horizontal` or not set.
  - `vertical` loops only if `orientation` is `vertical` or not set.
  - If `currentId` is initially set to `null`, the composite element will
be focused in between the last and first items.

  On two-dimensional composites:
  - `true` loops from the last row/column item to the first item in the
same row/column and vice-versa. If it's the last item in the last row, it
moves to the first item in the first row and vice-versa.
  - `horizontal` loops only from the last row item to the first item in
the same row.
  - `vertical` loops only from the last column item to the first item in
the column row.
  - If `currentId` is initially set to `null`, vertical loop will have no
effect as moving down from the last row or up from the first row will
focus the composite element.
  - If `wrap` matches the value of `loop`, it'll wrap between the last
item in the last row or column and the first item in the first row or
column and vice-versa.

- **`wrap`**
  <code>boolean | &#34;horizontal&#34; | &#34;vertical&#34;</code>

  **Has effect only on two-dimensional composites**. If enabled, moving to
the next item from the last one in a row or column will focus the first
item in the next row or column and vice-versa.
  - `true` wraps between rows and columns.
  - `horizontal` wraps only between rows.
  - `vertical` wraps only between columns.
  - If `loop` matches the value of `wrap`, it'll wrap between the last
item in the last row or column and the first item in the first row or
column and vice-versa.

- **`shift`**
  <code>boolean</code>

  **Has effect only on two-dimensional composites**. If enabled, moving up
or down when there's no next item or the next item is disabled will shift
to the item right before it.

- **`unstable_values`** <span title="Experimental">⚠️</span>
  <code>{ [x: string]: any; }</code>

  Stores the values of radios and checkboxes within the menu.

### `useMenuState`

- **`baseId`**
  <code>string</code>

  ID that will serve as a base for all the items IDs.

- **`unstable_virtual`** <span title="Experimental">⚠️</span>
  <code>boolean</code>

  If enabled, the composite element will act as an
[aria-activedescendant](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_focus_activedescendant)
container instead of
[roving tabindex](https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex).
DOM focus will remain on the composite while its items receive virtual focus.

- **`rtl`**
  <code>boolean</code>

  Determines how `next` and `previous` functions will behave. If `rtl` is
set to `true`, they will be inverted. This only affects the composite
widget behavior. You still need to set `dir="rtl"` on HTML/CSS.

- **`orientation`**
  <code>&#34;horizontal&#34; | &#34;vertical&#34; | undefined</code>

  Defines the orientation of the composite widget. If the composite has a
single row or column (one-dimensional), the `orientation` value determines
which arrow keys can be used to move focus:
  - `undefined`: all arrow keys work.
  - `horizontal`: only left and right arrow keys work.
  - `vertical`: only up and down arrow keys work.

  It doesn't have any effect on two-dimensional composites.

- **`currentId`**
  <code>string | null | undefined</code>

  The current focused item `id`.
  - `undefined` will automatically focus the first enabled composite item.
  - `null` will focus the base composite element and users will be able to
navigate out of it using arrow keys.
  - If `currentId` is initially set to `null`, the base composite element
itself will have focus and users will be able to navigate to it using
arrow keys.

- **`loop`**
  <code>boolean | &#34;horizontal&#34; | &#34;vertical&#34;</code>

  On one-dimensional composites:
  - `true` loops from the last item to the first item and vice-versa.
  - `horizontal` loops only if `orientation` is `horizontal` or not set.
  - `vertical` loops only if `orientation` is `vertical` or not set.
  - If `currentId` is initially set to `null`, the composite element will
be focused in between the last and first items.

  On two-dimensional composites:
  - `true` loops from the last row/column item to the first item in the
same row/column and vice-versa. If it's the last item in the last row, it
moves to the first item in the first row and vice-versa.
  - `horizontal` loops only from the last row item to the first item in
the same row.
  - `vertical` loops only from the last column item to the first item in
the column row.
  - If `currentId` is initially set to `null`, vertical loop will have no
effect as moving down from the last row or up from the first row will
focus the composite element.
  - If `wrap` matches the value of `loop`, it'll wrap between the last
item in the last row or column and the first item in the first row or
column and vice-versa.

- **`wrap`**
  <code>boolean | &#34;horizontal&#34; | &#34;vertical&#34;</code>

  **Has effect only on two-dimensional composites**. If enabled, moving to
the next item from the last one in a row or column will focus the first
item in the next row or column and vice-versa.
  - `true` wraps between rows and columns.
  - `horizontal` wraps only between rows.
  - `vertical` wraps only between columns.
  - If `loop` matches the value of `wrap`, it'll wrap between the last
item in the last row or column and the first item in the first row or
column and vice-versa.

- **`shift`**
  <code>boolean</code>

  **Has effect only on two-dimensional composites**. If enabled, moving up
or down when there's no next item or the next item is disabled will shift
to the item right before it.

- **`unstable_values`** <span title="Experimental">⚠️</span>
  <code>{ [x: string]: any; }</code>

  Stores the values of radios and checkboxes within the menu.

- **`visible`**
  <code>boolean</code>

  Whether it's visible or not.

- **`animated`**
  <code>number | boolean</code>

  If `true`, `animating` will be set to `true` when `visible` is updated.
It'll wait for `stopAnimation` to be called or a CSS transition ends.
If `animated` is set to a `number`, `stopAnimation` will be called only
after the same number of milliseconds have passed.

- **`modal`**
  <code>boolean</code>

  Toggles Dialog's `modal` state.
  - Non-modal: `preventBodyScroll` doesn't work and focus is free.
  - Modal: `preventBodyScroll` is automatically enabled, focus is
trapped within the dialog and the dialog is rendered within a `Portal`
by default.

- **`placement`**
  <code title="&#34;auto-start&#34; | &#34;auto&#34; | &#34;auto-end&#34; | &#34;top-start&#34; | &#34;top&#34; | &#34;top-end&#34; | &#34;right-start&#34; | &#34;right&#34; | &#34;right-end&#34; | &#34;bottom-end&#34; | &#34;bottom&#34; | &#34;bottom-start&#34; | &#34;left-end&#34; | &#34;left&#34; | &#34;left-start&#34;">&#34;auto-start&#34; | &#34;auto&#34; | &#34;auto-end&#34; | &#34;top-start...</code>

  Actual `placement`.

- **`unstable_fixed`** <span title="Experimental">⚠️</span>
  <code>boolean | undefined</code>

  Whether or not the popover should have `position` set to `fixed`.

- **`unstable_flip`** <span title="Experimental">⚠️</span>
  <code>boolean | undefined</code>

  Flip the popover's placement when it starts to overlap its reference
element.

- **`unstable_offset`** <span title="Experimental">⚠️</span>
  <code>[string | number, string | number] | undefined</code>

  Offset between the reference and the popover: [main axis, alt axis]. Should not be combined with `gutter`.

- **`gutter`**
  <code>number | undefined</code>

  Offset between the reference and the popover on the main axis. Should not be combined with `unstable_offset`.

- **`unstable_preventOverflow`** <span title="Experimental">⚠️</span>
  <code>boolean | undefined</code>

  Prevents popover from being positioned outside the boundary.

### `Menu`

- **`hideOnClickOutside`**
  <code>boolean | undefined</code>

  When enabled, user can hide the dialog by clicking outside it.

- **`preventBodyScroll`**
  <code>boolean | undefined</code>

  When enabled, user can't scroll on body when the dialog is visible.
This option doesn't work if the dialog isn't modal.

- **`unstable_initialFocusRef`** <span title="Experimental">⚠️</span>
  <code>RefObject&#60;HTMLElement&#62; | undefined</code>

  The element that will be focused when the dialog shows.
When not set, the first tabbable element within the dialog will be used.

- **`unstable_finalFocusRef`** <span title="Experimental">⚠️</span>
  <code>RefObject&#60;HTMLElement&#62; | undefined</code>

  The element that will be focused when the dialog hides.
When not set, the disclosure component will be used.

- **`unstable_orphan`** <span title="Experimental">⚠️</span>
  <code>boolean | undefined</code>

  Whether or not the dialog should be a child of its parent.
Opening a nested orphan dialog will close its parent dialog if
`hideOnClickOutside` is set to `true` on the parent.
It will be set to `false` if `modal` is `false`.

- **`disabled`**
  <code>boolean | undefined</code>

  Same as the HTML attribute.

- **`focusable`**
  <code>boolean | undefined</code>

  When an element is `disabled`, it may still be `focusable`. It works
similarly to `readOnly` on form elements. In this case, only
`aria-disabled` will be set.

<details><summary>21 state props</summary>

> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`baseId`**
  <code>string</code>

  ID that will serve as a base for all the items IDs.

- **`visible`**
  <code>boolean</code>

  Whether it's visible or not.

- **`animated`**
  <code>number | boolean</code>

  If `true`, `animating` will be set to `true` when `visible` is updated.
It'll wait for `stopAnimation` to be called or a CSS transition ends.
If `animated` is set to a `number`, `stopAnimation` will be called only
after the same number of milliseconds have passed.

- **`modal`**
  <code>boolean</code>

  Toggles Dialog's `modal` state.
  - Non-modal: `preventBodyScroll` doesn't work and focus is free.
  - Modal: `preventBodyScroll` is automatically enabled, focus is
trapped within the dialog and the dialog is rendered within a `Portal`
by default.

- **`animating`**
  <code>boolean</code>

  Whether it's animating or not.

- **`stopAnimation`**
  <code>() =&#62; void</code>

  Stops animation. It's called automatically if there's a CSS transition.

- **`hide`**
  <code>() =&#62; void</code>

  Changes the `visible` state to `false`

- **`placement`**
  <code title="&#34;auto-start&#34; | &#34;auto&#34; | &#34;auto-end&#34; | &#34;top-start&#34; | &#34;top&#34; | &#34;top-end&#34; | &#34;right-start&#34; | &#34;right&#34; | &#34;right-end&#34; | &#34;bottom-end&#34; | &#34;bottom&#34; | &#34;bottom-start&#34; | &#34;left-end&#34; | &#34;left&#34; | &#34;left-start&#34;">&#34;auto-start&#34; | &#34;auto&#34; | &#34;auto-end&#34; | &#34;top-start...</code>

  Actual `placement`.

- **`unstable_virtual`** <span title="Experimental">⚠️</span>
  <code>boolean</code>

  If enabled, the composite element will act as an
[aria-activedescendant](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_focus_activedescendant)
container instead of
[roving tabindex](https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex).
DOM focus will remain on the composite while its items receive virtual focus.

- **`orientation`**
  <code>&#34;horizontal&#34; | &#34;vertical&#34; | undefined</code>

  Defines the orientation of the composite widget. If the composite has a
single row or column (one-dimensional), the `orientation` value determines
which arrow keys can be used to move focus:
  - `undefined`: all arrow keys work.
  - `horizontal`: only left and right arrow keys work.
  - `vertical`: only up and down arrow keys work.

  It doesn't have any effect on two-dimensional composites.

- **`currentId`**
  <code>string | null | undefined</code>

  The current focused item `id`.
  - `undefined` will automatically focus the first enabled composite item.
  - `null` will focus the base composite element and users will be able to
navigate out of it using arrow keys.
  - If `currentId` is initially set to `null`, the base composite element
itself will have focus and users will be able to navigate to it using
arrow keys.

- **`wrap`**
  <code>boolean | &#34;horizontal&#34; | &#34;vertical&#34;</code>

  **Has effect only on two-dimensional composites**. If enabled, moving to
the next item from the last one in a row or column will focus the first
item in the next row or column and vice-versa.
  - `true` wraps between rows and columns.
  - `horizontal` wraps only between rows.
  - `vertical` wraps only between columns.
  - If `loop` matches the value of `wrap`, it'll wrap between the last
item in the last row or column and the first item in the first row or
column and vice-versa.

- **`unstable_moves`** <span title="Experimental">⚠️</span>
  <code>number</code>

  Stores the number of moves that have been performed by calling `move`,
`next`, `previous`, `up`, `down`, `first` or `last`.

- **`groups`**
  <code>Group[]</code>

  Lists all the composite groups with their `id` and DOM `ref`. This state
is automatically updated when `registerGroup` and `unregisterGroup` are
called.

- **`items`**
  <code>Item[]</code>

  Lists all the composite items with their `id`, DOM `ref`, `disabled` state
and `groupId` if any. This state is automatically updated when
`registerItem` and `unregisterItem` are called.

- **`setCurrentId`**
  <code title="(value: SetStateAction&#60;string | null | undefined&#62;) =&#62; void">(value: SetStateAction&#60;string | null | undefine...</code>

  Sets `currentId`. This is different from `composite.move` as this only
updates the `currentId` state without moving focus. When the composite
widget gets focused by the user, the item referred by the `currentId`
state will get focus.

- **`first`**
  <code>() =&#62; void</code>

  Moves focus to the first item.

- **`last`**
  <code>() =&#62; void</code>

  Moves focus to the last item.

- **`move`**
  <code>(id: string | null) =&#62; void</code>

  Moves focus to a given item ID.

- **`next`**
  <code>(unstable_allTheWay?: boolean | undefined) =&#62; void</code>

  Moves focus to the next item.

- **`previous`**
  <code>(unstable_allTheWay?: boolean | undefined) =&#62; void</code>

  Moves focus to the previous item.

</details>

### `MenuArrow`

- **`size`**
  <code>string | number | undefined</code>

  Arrow's size

<details><summary>1 state props</summary>

> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`placement`**
  <code title="&#34;auto-start&#34; | &#34;auto&#34; | &#34;auto-end&#34; | &#34;top-start&#34; | &#34;top&#34; | &#34;top-end&#34; | &#34;right-start&#34; | &#34;right&#34; | &#34;right-end&#34; | &#34;bottom-end&#34; | &#34;bottom&#34; | &#34;bottom-start&#34; | &#34;left-end&#34; | &#34;left&#34; | &#34;left-start&#34;">&#34;auto-start&#34; | &#34;auto&#34; | &#34;auto-end&#34; | &#34;top-start...</code>

  Actual `placement`.

</details>

### `MenuBar`

- **`disabled`**
  <code>boolean | undefined</code>

  Same as the HTML attribute.

- **`focusable`**
  <code>boolean | undefined</code>

  When an element is `disabled`, it may still be `focusable`. It works
similarly to `readOnly` on form elements. In this case, only
`aria-disabled` will be set.

<details><summary>14 state props</summary>

> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`baseId`**
  <code>string</code>

  ID that will serve as a base for all the items IDs.

- **`unstable_virtual`** <span title="Experimental">⚠️</span>
  <code>boolean</code>

  If enabled, the composite element will act as an
[aria-activedescendant](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_focus_activedescendant)
container instead of
[roving tabindex](https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex).
DOM focus will remain on the composite while its items receive virtual focus.

- **`orientation`**
  <code>&#34;horizontal&#34; | &#34;vertical&#34; | undefined</code>

  Defines the orientation of the composite widget. If the composite has a
single row or column (one-dimensional), the `orientation` value determines
which arrow keys can be used to move focus:
  - `undefined`: all arrow keys work.
  - `horizontal`: only left and right arrow keys work.
  - `vertical`: only up and down arrow keys work.

  It doesn't have any effect on two-dimensional composites.

- **`currentId`**
  <code>string | null | undefined</code>

  The current focused item `id`.
  - `undefined` will automatically focus the first enabled composite item.
  - `null` will focus the base composite element and users will be able to
navigate out of it using arrow keys.
  - If `currentId` is initially set to `null`, the base composite element
itself will have focus and users will be able to navigate to it using
arrow keys.

- **`wrap`**
  <code>boolean | &#34;horizontal&#34; | &#34;vertical&#34;</code>

  **Has effect only on two-dimensional composites**. If enabled, moving to
the next item from the last one in a row or column will focus the first
item in the next row or column and vice-versa.
  - `true` wraps between rows and columns.
  - `horizontal` wraps only between rows.
  - `vertical` wraps only between columns.
  - If `loop` matches the value of `wrap`, it'll wrap between the last
item in the last row or column and the first item in the first row or
column and vice-versa.

- **`unstable_moves`** <span title="Experimental">⚠️</span>
  <code>number</code>

  Stores the number of moves that have been performed by calling `move`,
`next`, `previous`, `up`, `down`, `first` or `last`.

- **`groups`**
  <code>Group[]</code>

  Lists all the composite groups with their `id` and DOM `ref`. This state
is automatically updated when `registerGroup` and `unregisterGroup` are
called.

- **`items`**
  <code>Item[]</code>

  Lists all the composite items with their `id`, DOM `ref`, `disabled` state
and `groupId` if any. This state is automatically updated when
`registerItem` and `unregisterItem` are called.

- **`setCurrentId`**
  <code title="(value: SetStateAction&#60;string | null | undefined&#62;) =&#62; void">(value: SetStateAction&#60;string | null | undefine...</code>

  Sets `currentId`. This is different from `composite.move` as this only
updates the `currentId` state without moving focus. When the composite
widget gets focused by the user, the item referred by the `currentId`
state will get focus.

- **`first`**
  <code>() =&#62; void</code>

  Moves focus to the first item.

- **`last`**
  <code>() =&#62; void</code>

  Moves focus to the last item.

- **`move`**
  <code>(id: string | null) =&#62; void</code>

  Moves focus to a given item ID.

- **`next`**
  <code>(unstable_allTheWay?: boolean | undefined) =&#62; void</code>

  Moves focus to the next item.

- **`previous`**
  <code>(unstable_allTheWay?: boolean | undefined) =&#62; void</code>

  Moves focus to the previous item.

</details>

### `MenuButton`

- **`disabled`**
  <code>boolean | undefined</code>

  Same as the HTML attribute.

- **`focusable`**
  <code>boolean | undefined</code>

  When an element is `disabled`, it may still be `focusable`. It works
similarly to `readOnly` on form elements. In this case, only
`aria-disabled` will be set.

<details><summary>12 state props</summary>

> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`visible`**
  <code>boolean</code>

  Whether it's visible or not.

- **`baseId`**
  <code>string</code>

  ID that will serve as a base for all the items IDs.

- **`toggle`**
  <code>() =&#62; void</code>

  Toggles the `visible` state

- **`unstable_referenceRef`** <span title="Experimental">⚠️</span>
  <code>RefObject&#60;HTMLElement | null&#62;</code>

  The reference element.

- **`currentId`**
  <code>string | null | undefined</code>

  The current focused item `id`.
  - `undefined` will automatically focus the first enabled composite item.
  - `null` will focus the base composite element and users will be able to
navigate out of it using arrow keys.
  - If `currentId` is initially set to `null`, the base composite element
itself will have focus and users will be able to navigate to it using
arrow keys.

- **`hide`**
  <code>() =&#62; void</code>

  Changes the `visible` state to `false`

- **`unstable_moves`** <span title="Experimental">⚠️</span>
  <code>number</code>

  Stores the number of moves that have been performed by calling `move`,
`next`, `previous`, `up`, `down`, `first` or `last`.

- **`move`**
  <code>(id: string | null) =&#62; void</code>

  Moves focus to a given item ID.

- **`placement`**
  <code title="&#34;auto-start&#34; | &#34;auto&#34; | &#34;auto-end&#34; | &#34;top-start&#34; | &#34;top&#34; | &#34;top-end&#34; | &#34;right-start&#34; | &#34;right&#34; | &#34;right-end&#34; | &#34;bottom-end&#34; | &#34;bottom&#34; | &#34;bottom-start&#34; | &#34;left-end&#34; | &#34;left&#34; | &#34;left-start&#34;">&#34;auto-start&#34; | &#34;auto&#34; | &#34;auto-end&#34; | &#34;top-start...</code>

  Actual `placement`.

- **`show`**
  <code>() =&#62; void</code>

  Changes the `visible` state to `true`

- **`first`**
  <code>() =&#62; void</code>

  Moves focus to the first item.

- **`last`**
  <code>() =&#62; void</code>

  Moves focus to the last item.

</details>

### `MenuDisclosure`

- **`disabled`**
  <code>boolean | undefined</code>

  Same as the HTML attribute.

- **`focusable`**
  <code>boolean | undefined</code>

  When an element is `disabled`, it may still be `focusable`. It works
similarly to `readOnly` on form elements. In this case, only
`aria-disabled` will be set.

<details><summary>12 state props</summary>

> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`visible`**
  <code>boolean</code>

  Whether it's visible or not.

- **`baseId`**
  <code>string</code>

  ID that will serve as a base for all the items IDs.

- **`toggle`**
  <code>() =&#62; void</code>

  Toggles the `visible` state

- **`unstable_referenceRef`** <span title="Experimental">⚠️</span>
  <code>RefObject&#60;HTMLElement | null&#62;</code>

  The reference element.

- **`currentId`**
  <code>string | null | undefined</code>

  The current focused item `id`.
  - `undefined` will automatically focus the first enabled composite item.
  - `null` will focus the base composite element and users will be able to
navigate out of it using arrow keys.
  - If `currentId` is initially set to `null`, the base composite element
itself will have focus and users will be able to navigate to it using
arrow keys.

- **`hide`**
  <code>() =&#62; void</code>

  Changes the `visible` state to `false`

- **`unstable_moves`** <span title="Experimental">⚠️</span>
  <code>number</code>

  Stores the number of moves that have been performed by calling `move`,
`next`, `previous`, `up`, `down`, `first` or `last`.

- **`move`**
  <code>(id: string | null) =&#62; void</code>

  Moves focus to a given item ID.

- **`placement`**
  <code title="&#34;auto-start&#34; | &#34;auto&#34; | &#34;auto-end&#34; | &#34;top-start&#34; | &#34;top&#34; | &#34;top-end&#34; | &#34;right-start&#34; | &#34;right&#34; | &#34;right-end&#34; | &#34;bottom-end&#34; | &#34;bottom&#34; | &#34;bottom-start&#34; | &#34;left-end&#34; | &#34;left&#34; | &#34;left-start&#34;">&#34;auto-start&#34; | &#34;auto&#34; | &#34;auto-end&#34; | &#34;top-start...</code>

  Actual `placement`.

- **`show`**
  <code>() =&#62; void</code>

  Changes the `visible` state to `true`

- **`first`**
  <code>() =&#62; void</code>

  Moves focus to the first item.

- **`last`**
  <code>() =&#62; void</code>

  Moves focus to the last item.

</details>

### `MenuGroup`

No props to show

### `MenuItem`

- **`disabled`**
  <code>boolean | undefined</code>

  Same as the HTML attribute.

- **`focusable`**
  <code>boolean | undefined</code>

  When an element is `disabled`, it may still be `focusable`. It works
similarly to `readOnly` on form elements. In this case, only
`aria-disabled` will be set.

- **`id`**
  <code>string | undefined</code>

  Same as the HTML attribute.

<details><summary>19 state props</summary>

> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`baseId`**
  <code>string</code>

  ID that will serve as a base for all the items IDs.

- **`unstable_virtual`** <span title="Experimental">⚠️</span>
  <code>boolean</code>

  If enabled, the composite element will act as an
[aria-activedescendant](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_focus_activedescendant)
container instead of
[roving tabindex](https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex).
DOM focus will remain on the composite while its items receive virtual focus.

- **`orientation`**
  <code>&#34;horizontal&#34; | &#34;vertical&#34; | undefined</code>

  Defines the orientation of the composite widget. If the composite has a
single row or column (one-dimensional), the `orientation` value determines
which arrow keys can be used to move focus:
  - `undefined`: all arrow keys work.
  - `horizontal`: only left and right arrow keys work.
  - `vertical`: only up and down arrow keys work.

  It doesn't have any effect on two-dimensional composites.

- **`unstable_moves`** <span title="Experimental">⚠️</span>
  <code>number</code>

  Stores the number of moves that have been performed by calling `move`,
`next`, `previous`, `up`, `down`, `first` or `last`.

- **`currentId`**
  <code>string | null | undefined</code>

  The current focused item `id`.
  - `undefined` will automatically focus the first enabled composite item.
  - `null` will focus the base composite element and users will be able to
navigate out of it using arrow keys.
  - If `currentId` is initially set to `null`, the base composite element
itself will have focus and users will be able to navigate to it using
arrow keys.

- **`items`**
  <code>Item[]</code>

  Lists all the composite items with their `id`, DOM `ref`, `disabled` state
and `groupId` if any. This state is automatically updated when
`registerItem` and `unregisterItem` are called.

- **`setCurrentId`**
  <code title="(value: SetStateAction&#60;string | null | undefined&#62;) =&#62; void">(value: SetStateAction&#60;string | null | undefine...</code>

  Sets `currentId`. This is different from `composite.move` as this only
updates the `currentId` state without moving focus. When the composite
widget gets focused by the user, the item referred by the `currentId`
state will get focus.

- **`first`**
  <code>() =&#62; void</code>

  Moves focus to the first item.

- **`last`**
  <code>() =&#62; void</code>

  Moves focus to the last item.

- **`next`**
  <code>(unstable_allTheWay?: boolean | undefined) =&#62; void</code>

  Moves focus to the next item.

- **`previous`**
  <code>(unstable_allTheWay?: boolean | undefined) =&#62; void</code>

  Moves focus to the previous item.

- **`registerItem`**
  <code>(item: Item) =&#62; void</code>

  Registers a composite item.

- **`unregisterItem`**
  <code>(id: string) =&#62; void</code>

  Unregisters a composite item.

- **`up`**
  <code>(unstable_allTheWay?: boolean | undefined) =&#62; void</code>

  Moves focus to the item above.

- **`down`**
  <code>(unstable_allTheWay?: boolean | undefined) =&#62; void</code>

  Moves focus to the item below.

- **`visible`**
  <code>boolean</code>

  Whether it's visible or not.

- **`placement`**
  <code title="&#34;auto-start&#34; | &#34;auto&#34; | &#34;auto-end&#34; | &#34;top-start&#34; | &#34;top&#34; | &#34;top-end&#34; | &#34;right-start&#34; | &#34;right&#34; | &#34;right-end&#34; | &#34;bottom-end&#34; | &#34;bottom&#34; | &#34;bottom-start&#34; | &#34;left-end&#34; | &#34;left&#34; | &#34;left-start&#34;">&#34;auto-start&#34; | &#34;auto&#34; | &#34;auto-end&#34; | &#34;top-start...</code>

  Actual `placement`.

- **`hide`**
  <code>() =&#62; void</code>

  Changes the `visible` state to `false`

- **`move`**
  <code>(id: string | null) =&#62; void</code>

  Moves focus to a given item ID.

</details>

### `MenuItemCheckbox`

- **`disabled`**
  <code>boolean | undefined</code>

  Same as the HTML attribute.

- **`focusable`**
  <code>boolean | undefined</code>

  When an element is `disabled`, it may still be `focusable`. It works
similarly to `readOnly` on form elements. In this case, only
`aria-disabled` will be set.

- **`value`**
  <code>string | number | undefined</code>

  Checkbox's value is going to be used when multiple checkboxes share the
same state. Checking a checkbox with value will add it to the state
array.

- **`checked`**
  <code>boolean | undefined</code>

  Checkbox's checked state. If present, it's used instead of `state`.

- **`id`**
  <code>string | undefined</code>

  Same as the HTML attribute.

- **`name`**
  <code>string</code>

  MenuItemCheckbox's name as in `menu.values`.

<details><summary>23 state props</summary>

> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`state`**
  <code>boolean | &#34;indeterminate&#34; | (string | number)[]</code>

  Stores the state of the checkbox.
If checkboxes that share this state have defined a `value` prop, it's
going to be an array.

- **`setState`**
  <code title="(value: SetStateAction&#60;boolean | &#34;indeterminate&#34; | (string | number)[]&#62;) =&#62; void">(value: SetStateAction&#60;boolean | &#34;indeterminate...</code>

  Sets `state`.

- **`baseId`**
  <code>string</code>

  ID that will serve as a base for all the items IDs.

- **`unstable_virtual`** <span title="Experimental">⚠️</span>
  <code>boolean</code>

  If enabled, the composite element will act as an
[aria-activedescendant](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_focus_activedescendant)
container instead of
[roving tabindex](https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex).
DOM focus will remain on the composite while its items receive virtual focus.

- **`orientation`**
  <code>&#34;horizontal&#34; | &#34;vertical&#34; | undefined</code>

  Defines the orientation of the composite widget. If the composite has a
single row or column (one-dimensional), the `orientation` value determines
which arrow keys can be used to move focus:
  - `undefined`: all arrow keys work.
  - `horizontal`: only left and right arrow keys work.
  - `vertical`: only up and down arrow keys work.

  It doesn't have any effect on two-dimensional composites.

- **`unstable_moves`** <span title="Experimental">⚠️</span>
  <code>number</code>

  Stores the number of moves that have been performed by calling `move`,
`next`, `previous`, `up`, `down`, `first` or `last`.

- **`currentId`**
  <code>string | null | undefined</code>

  The current focused item `id`.
  - `undefined` will automatically focus the first enabled composite item.
  - `null` will focus the base composite element and users will be able to
navigate out of it using arrow keys.
  - If `currentId` is initially set to `null`, the base composite element
itself will have focus and users will be able to navigate to it using
arrow keys.

- **`items`**
  <code>Item[]</code>

  Lists all the composite items with their `id`, DOM `ref`, `disabled` state
and `groupId` if any. This state is automatically updated when
`registerItem` and `unregisterItem` are called.

- **`setCurrentId`**
  <code title="(value: SetStateAction&#60;string | null | undefined&#62;) =&#62; void">(value: SetStateAction&#60;string | null | undefine...</code>

  Sets `currentId`. This is different from `composite.move` as this only
updates the `currentId` state without moving focus. When the composite
widget gets focused by the user, the item referred by the `currentId`
state will get focus.

- **`first`**
  <code>() =&#62; void</code>

  Moves focus to the first item.

- **`last`**
  <code>() =&#62; void</code>

  Moves focus to the last item.

- **`next`**
  <code>(unstable_allTheWay?: boolean | undefined) =&#62; void</code>

  Moves focus to the next item.

- **`previous`**
  <code>(unstable_allTheWay?: boolean | undefined) =&#62; void</code>

  Moves focus to the previous item.

- **`registerItem`**
  <code>(item: Item) =&#62; void</code>

  Registers a composite item.

- **`unregisterItem`**
  <code>(id: string) =&#62; void</code>

  Unregisters a composite item.

- **`up`**
  <code>(unstable_allTheWay?: boolean | undefined) =&#62; void</code>

  Moves focus to the item above.

- **`down`**
  <code>(unstable_allTheWay?: boolean | undefined) =&#62; void</code>

  Moves focus to the item below.

- **`visible`**
  <code>boolean</code>

  Whether it's visible or not.

- **`placement`**
  <code title="&#34;auto-start&#34; | &#34;auto&#34; | &#34;auto-end&#34; | &#34;top-start&#34; | &#34;top&#34; | &#34;top-end&#34; | &#34;right-start&#34; | &#34;right&#34; | &#34;right-end&#34; | &#34;bottom-end&#34; | &#34;bottom&#34; | &#34;bottom-start&#34; | &#34;left-end&#34; | &#34;left&#34; | &#34;left-start&#34;">&#34;auto-start&#34; | &#34;auto&#34; | &#34;auto-end&#34; | &#34;top-start...</code>

  Actual `placement`.

- **`hide`**
  <code>() =&#62; void</code>

  Changes the `visible` state to `false`

- **`move`**
  <code>(id: string | null) =&#62; void</code>

  Moves focus to a given item ID.

- **`unstable_values`** <span title="Experimental">⚠️</span>
  <code>{ [x: string]: any; }</code>

  Stores the values of radios and checkboxes within the menu.

- **`unstable_setValue`** <span title="Experimental">⚠️</span>
  <code>(name: string, value?: any) =&#62; void</code>

  Updates checkboxes and radios values within the menu.

</details>

### `MenuItemRadio`

- **`disabled`**
  <code>boolean | undefined</code>

  Same as the HTML attribute.

- **`focusable`**
  <code>boolean | undefined</code>

  When an element is `disabled`, it may still be `focusable`. It works
similarly to `readOnly` on form elements. In this case, only
`aria-disabled` will be set.

- **`id`**
  <code>string | undefined</code>

  Same as the HTML attribute.

- **`value`**
  <code>string | number</code>

  Same as the `value` attribute.

- **`checked`**
  <code>boolean | undefined</code>

  Same as the `checked` attribute.

- **`name`**
  <code>string</code>

  MenuItemRadio's name as in `menu.values`.

<details><summary>23 state props</summary>

> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`baseId`**
  <code>string</code>

  ID that will serve as a base for all the items IDs.

- **`unstable_virtual`** <span title="Experimental">⚠️</span>
  <code>boolean</code>

  If enabled, the composite element will act as an
[aria-activedescendant](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_focus_activedescendant)
container instead of
[roving tabindex](https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex).
DOM focus will remain on the composite while its items receive virtual focus.

- **`orientation`**
  <code>&#34;horizontal&#34; | &#34;vertical&#34; | undefined</code>

  Defines the orientation of the composite widget. If the composite has a
single row or column (one-dimensional), the `orientation` value determines
which arrow keys can be used to move focus:
  - `undefined`: all arrow keys work.
  - `horizontal`: only left and right arrow keys work.
  - `vertical`: only up and down arrow keys work.

  It doesn't have any effect on two-dimensional composites.

- **`unstable_moves`** <span title="Experimental">⚠️</span>
  <code>number</code>

  Stores the number of moves that have been performed by calling `move`,
`next`, `previous`, `up`, `down`, `first` or `last`.

- **`currentId`**
  <code>string | null | undefined</code>

  The current focused item `id`.
  - `undefined` will automatically focus the first enabled composite item.
  - `null` will focus the base composite element and users will be able to
navigate out of it using arrow keys.
  - If `currentId` is initially set to `null`, the base composite element
itself will have focus and users will be able to navigate to it using
arrow keys.

- **`items`**
  <code>Item[]</code>

  Lists all the composite items with their `id`, DOM `ref`, `disabled` state
and `groupId` if any. This state is automatically updated when
`registerItem` and `unregisterItem` are called.

- **`setCurrentId`**
  <code title="(value: SetStateAction&#60;string | null | undefined&#62;) =&#62; void">(value: SetStateAction&#60;string | null | undefine...</code>

  Sets `currentId`. This is different from `composite.move` as this only
updates the `currentId` state without moving focus. When the composite
widget gets focused by the user, the item referred by the `currentId`
state will get focus.

- **`first`**
  <code>() =&#62; void</code>

  Moves focus to the first item.

- **`last`**
  <code>() =&#62; void</code>

  Moves focus to the last item.

- **`next`**
  <code>(unstable_allTheWay?: boolean | undefined) =&#62; void</code>

  Moves focus to the next item.

- **`previous`**
  <code>(unstable_allTheWay?: boolean | undefined) =&#62; void</code>

  Moves focus to the previous item.

- **`registerItem`**
  <code>(item: Item) =&#62; void</code>

  Registers a composite item.

- **`unregisterItem`**
  <code>(id: string) =&#62; void</code>

  Unregisters a composite item.

- **`up`**
  <code>(unstable_allTheWay?: boolean | undefined) =&#62; void</code>

  Moves focus to the item above.

- **`down`**
  <code>(unstable_allTheWay?: boolean | undefined) =&#62; void</code>

  Moves focus to the item below.

- **`state`**
  <code>string | number | undefined</code>

  The `value` attribute of the current checked radio.

- **`setState`**
  <code title="(value: SetStateAction&#60;string | number | undefined&#62;) =&#62; void">(value: SetStateAction&#60;string | number | undefi...</code>

  Sets `state`.

- **`visible`**
  <code>boolean</code>

  Whether it's visible or not.

- **`placement`**
  <code title="&#34;auto-start&#34; | &#34;auto&#34; | &#34;auto-end&#34; | &#34;top-start&#34; | &#34;top&#34; | &#34;top-end&#34; | &#34;right-start&#34; | &#34;right&#34; | &#34;right-end&#34; | &#34;bottom-end&#34; | &#34;bottom&#34; | &#34;bottom-start&#34; | &#34;left-end&#34; | &#34;left&#34; | &#34;left-start&#34;">&#34;auto-start&#34; | &#34;auto&#34; | &#34;auto-end&#34; | &#34;top-start...</code>

  Actual `placement`.

- **`hide`**
  <code>() =&#62; void</code>

  Changes the `visible` state to `false`

- **`move`**
  <code>(id: string | null) =&#62; void</code>

  Moves focus to a given item ID.

- **`unstable_values`** <span title="Experimental">⚠️</span>
  <code>{ [x: string]: any; }</code>

  Stores the values of radios and checkboxes within the menu.

- **`unstable_setValue`** <span title="Experimental">⚠️</span>
  <code>(name: string, value?: any) =&#62; void</code>

  Updates checkboxes and radios values within the menu.

</details>

### `MenuSeparator`

<details><summary>1 state props</summary>

> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`orientation`**
  <code>&#34;horizontal&#34; | &#34;vertical&#34; | undefined</code>

  Separator's orientation.

</details>
