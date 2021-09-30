---
path: /docs/composite/
---

# Composite

`Composite` is a component that may contain navigable items represented by `CompositeItem`. It's inspired by the [WAI-ARIA Composite Role](https://www.w3.org/TR/wai-aria-1.1/#composite) and implements all the [keyboard navigation mechanisms](https://www.w3.org/TR/wai-aria-practices/#kbd_general_within) to ensure that there's only one tab stop for the whole `Composite` element. This means that it can behave as a [roving tabindex](https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex) or [aria-activedescendant](https://www.w3.org/TR/wai-aria-practices/#kbd_focus_activedescendant) container.

Since this a very abstract component, it's recommended that you use more concrete ones like `Menu`, `Toolbar`, `TabList` and other derivative components, or build your own on top of `Composite`.

<carbon-ad></carbon-ad>

## Installation

```sh
npm install reakit
```

Learn more in [Get started](/docs/get-started/).

## Usage

In the most basic usage, `Composite` will work as a [roving tabindex](https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex) container that works on both directions. That is, it listens to all arrow keys. You can specify a direction by passing an `orientation` initial state to `useCompositeState`.

<!-- eslint-disable no-alert -->

```jsx
import React from "react";
import { useCompositeState, Composite, CompositeItem } from "reakit/Composite";

function Example() {
  const composite = useCompositeState();
  return (
    <Composite {...composite} role="toolbar" aria-label="My toolbar">
      <CompositeItem {...composite} onClick={() => alert("clicked")}>
        Item 1
      </CompositeItem>
      <CompositeItem {...composite}>Item 2</CompositeItem>
      <CompositeItem {...composite}>Item 3</CompositeItem>
    </Composite>
  );
}
```

### aria-activedescendant

`Composite` may work as an [aria-activedescendant](https://www.w3.org/TR/wai-aria-practices/#kbd_focus_activedescendant) container by just setting the `virtual` initial state to `true`.

You can still attach event handlers to `CompositeItem` just like it were using the roving tabindex method. You don't need to change anything else to make it work.

> The `unstable_virtual` prop is still experimental and may change in future patch and minor releases.

<!-- eslint-disable no-alert -->

```jsx
import React from "react";
import { useCompositeState, Composite, CompositeItem } from "reakit/Composite";

function Example() {
  const composite = useCompositeState({ unstable_virtual: true });
  return (
    <Composite {...composite} role="toolbar" aria-label="My toolbar">
      <CompositeItem {...composite} onClick={() => alert("clicked")}>
        Item 1
      </CompositeItem>
      <CompositeItem {...composite}>Item 2</CompositeItem>
      <CompositeItem {...composite}>Item 3</CompositeItem>
    </Composite>
  );
}
```

### Two-dimensional navigation

You can build a two-dimensional `Composite` by using `CompositeGroup`.

```jsx
import React from "react";
import {
  useCompositeState,
  Composite,
  CompositeGroup,
  CompositeItem,
} from "reakit/Composite";

function Grid(props) {
  return <Composite role="grid" {...props} />;
}

function GridRow(props) {
  return <CompositeGroup role="row" {...props} />;
}

function GridCell(props) {
  return <CompositeItem as="div" role="gridcell" {...props} />;
}

function Example() {
  const composite = useCompositeState({ wrap: true });
  return (
    <Grid {...composite} aria-label="My grid">
      <GridRow {...composite}>
        <GridCell {...composite}>Item</GridCell>
        <GridCell {...composite}>Item</GridCell>
        <GridCell {...composite}>Item</GridCell>
        <GridCell {...composite}>Item</GridCell>
        <GridCell {...composite}>Item</GridCell>
      </GridRow>
      <GridRow {...composite}>
        <GridCell {...composite}>Item</GridCell>
        <GridCell {...composite}>Item</GridCell>
        <GridCell {...composite}>Item</GridCell>
        <GridCell {...composite}>Item</GridCell>
        <GridCell {...composite}>Item</GridCell>
      </GridRow>
      <GridRow {...composite}>
        <GridCell {...composite}>Item</GridCell>
        <GridCell {...composite}>Item</GridCell>
        <GridCell {...composite}>Item</GridCell>
        <GridCell {...composite}>Item</GridCell>
        <GridCell {...composite}>Item</GridCell>
      </GridRow>
    </Grid>
  );
}
```

## Performance

If you notice performance issues when rendering several `CompositeItem`s, you can do the following:

1. Pass an `id` prop to each `CompositeItem`.
2. Memoize all non-primitive props that you're passing to `CompositeItem`, including event handlers (e.g. `onClick`) and the `children` prop.

`CompositeItem` will compare the passed `id` with `composite.currentId` and, if the other props haven't been changed, it'll only re-render if it's the previous or the current active item.

In the example below, focus on any item and keep <kbd>→</kbd> pressed to see it smoothly changing focus. Then, unmemoize any non-primitive prop (like `onClick` or `children`) and do the same to see the difference yourself. 

<!-- eslint-disable no-alert -->

```jsx unstyled
import React from "react";
import { useCompositeState, Composite, CompositeItem } from "reakit/Composite";

const items = Array.from({ length: 88 }).map((_, i) => `item-${i}`);

function Example() {
  const composite = useCompositeState({ loop: true });
  // Remove the React.useCallback call below to see the difference
  const onClick = React.useCallback((event) => {
    window.alert(event.currentTarget.id);
  }, []);
  // If children aren't primitive values (like strings), you can memoize them
  // with React.useCallback
  const children = React.useCallback(
    (itemProps) => <span {...itemProps}>👉</span>,
    []
  );
  return (
    <Composite {...composite} role="toolbar" aria-label="Performance">
      {items.map((id) => (
        <CompositeItem {...composite} key={id} id={id} onClick={onClick}>
          {children}
        </CompositeItem>
      ))}
    </Composite>
  );
}
```

## Accessibility

- When `virtual` is set to `false` (default):
  - `CompositemItem` has `tabindex` set to `0` if it's the current element. Otherwise `tabindex` is set to `-1`.
- When `virtual` is set to `true`:
  - `Composite` has `tabindex` set to `0` and has `aria-activedescendant` set to the id of the current `CompositeItem`.
  - `CompositeItem` has `aria-selected` set to `true` if it's the current element.
- On one-dimensional composites:
  - <kbd>↑</kbd> moves focus to the previous `CompositeItem` if `orientation` is `vertical` or not defined.
  - <kbd>↓</kbd> moves focus to the next `CompositeItem` if `orientation` is `vertical` or not defined.
  - <kbd>→</kbd> moves focus to the next `CompositeItem` if `orientation` is `horizontal` or not defined.
  - <kbd>←</kbd> moves focus to the previous `CompositeItem` if `orientation` is `horizontal` or not defined.
  - <kbd>Home</kbd> or <kbd>PageUp</kbd> moves focus to the first `CompositeItem`.
  - <kbd>End</kbd> or <kbd>PageDown</kbd> moves focus to the last `CompositeItem`.
- On two-dimensional composites:
  - <kbd>↑</kbd> moves focus to the `CompositeItem` above.
  - <kbd>↓</kbd> moves focus to the `CompositeItem` below.
  - <kbd>→</kbd> moves focus to the next `CompositeItem`.
  - <kbd>←</kbd> moves focus to the previous `CompositeItem`.
  - <kbd>Home</kbd> moves focus to the first `CompositeItem` in the row.
  - <kbd>End</kbd> moves focus to the last `CompositeItem` in the row.
  - <kbd>PageUp</kbd> moves focus to the first `CompositeItem` in the column.
  - <kbd>PageDown</kbd> moves focus to the last `CompositeItem` in the column.
  - <kbd>Ctrl</kbd>+<kbd>Home</kbd> moves focus to the first `CompositeItem` in the composite element.
  - <kbd>Ctrl</kbd>+<kbd>End</kbd> moves focus to the last `CompositeItem` in the composite element.

Learn more in [Accessibility](/docs/accessibility/).

## Composition

- `Composite` uses [Tabbable](/docs/tabbable/), and is used by [TabList](/docs/tab/), [RadioGroup](/docs/radio/), [Menu](/docs/menu/) and [Toolbar](/docs/toolbar/).
- `CompositeGroup` uses [Group](/docs/group/) and [Id](/docs/id/).
- `CompositeItem` uses [Id](/docs/id/) and [Clickable](/docs/clickable/), and is used by [Tab](/docs/tab/), [Radio](/docs/radio/), [MenuItem](/docs/menu/) and [ToolbarItem](/docs/toolbar/).

Learn more in [Composition](/docs/composition/#props-hooks).

## Props

<!-- Automatically generated -->

### `useCompositeState`

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

### `Composite`

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

</details>

### `CompositeGroup`

- **`id`**
  <code>string | undefined</code>

  Same as the HTML attribute.

<details><summary>6 state props</summary>

> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`baseId`**
  <code>string</code>

  ID that will serve as a base for all the items IDs.

- **`registerGroup`**
  <code>(group: Group) =&#62; void</code>

  Registers a composite group.

- **`unregisterGroup`**
  <code>(id: string) =&#62; void</code>

  Unregisters a composite group.

- **`currentId`**
  <code>string | null | undefined</code>

  The current focused item `id`.
  - `undefined` will automatically focus the first enabled composite item.
  - `null` will focus the base composite element and users will be able to
navigate out of it using arrow keys.
  - If `currentId` is initially set to `null`, the base composite element
itself will have focus and users will be able to navigate to it using
arrow keys.

- **`unstable_moves`** <span title="Experimental">⚠️</span>
  <code>number</code>

  Stores the number of moves that have been performed by calling `move`,
`next`, `previous`, `up`, `down`, `first` or `last`.

- **`items`**
  <code>Item[]</code>

  Lists all the composite items with their `id`, DOM `ref`, `disabled` state
and `groupId` if any. This state is automatically updated when
`registerItem` and `unregisterItem` are called.

</details>

### `CompositeItem`

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

<details><summary>15 state props</summary>

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

- **`registerItem`**
  <code>(item: Item) =&#62; void</code>

  Registers a composite item.

- **`unregisterItem`**
  <code>(id: string) =&#62; void</code>

  Unregisters a composite item.

- **`next`**
  <code>(unstable_allTheWay?: boolean | undefined) =&#62; void</code>

  Moves focus to the next item.

- **`previous`**
  <code>(unstable_allTheWay?: boolean | undefined) =&#62; void</code>

  Moves focus to the previous item.

- **`up`**
  <code>(unstable_allTheWay?: boolean | undefined) =&#62; void</code>

  Moves focus to the item above.

- **`down`**
  <code>(unstable_allTheWay?: boolean | undefined) =&#62; void</code>

  Moves focus to the item below.

</details>

### `CompositeItemWidget`

<details><summary>2 state props</summary>

> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

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

- **`currentId`**
  <code>string | null | undefined</code>

  The current focused item `id`.
  - `undefined` will automatically focus the first enabled composite item.
  - `null` will focus the base composite element and users will be able to
navigate out of it using arrow keys.
  - If `currentId` is initially set to `null`, the base composite element
itself will have focus and users will be able to navigate to it using
arrow keys.

</details>
