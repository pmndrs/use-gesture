---
path: /docs/tab/
redirect_from:
  - /components/tabs/
  - /components/tabs/tabscontainer/
  - /components/tabs/tabsnext/
  - /components/tabs/tabspanel/
  - /components/tabs/tabsprevious/
  - /components/tabs/tabstab/
---

# Tab

Accessible `Tab` component that follows the [WAI-ARIA Tabs Pattern](https://www.w3.org/TR/wai-aria-practices/#tabpanel). It's a component that, when activated, display a `TabPanel`.

<carbon-ad></carbon-ad>

## Installation

```sh
npm install reakit
```

Learn more in [Get started](/docs/get-started/).

## Usage

```jsx
import { useTabState, Tab, TabList, TabPanel } from "reakit/Tab";

function Example() {
  const tab = useTabState();
  return (
    <>
      <TabList {...tab} aria-label="My tabs">
        <Tab {...tab}>Tab 1</Tab>
        <Tab {...tab} disabled>
          Tab 2
        </Tab>
        <Tab {...tab}>Tab 3</Tab>
      </TabList>
      <TabPanel {...tab}>Tab 1</TabPanel>
      <TabPanel {...tab}>Tab 2</TabPanel>
      <TabPanel {...tab}>Tab 3</TabPanel>
    </>
  );
}
```

### Default selected tab

You can set the default selected tab by passing an `id` to `selectedId` on `useTabState`.

```jsx
import { useTabState, Tab, TabList, TabPanel } from "reakit/Tab";

function Example() {
  const tab = useTabState({ selectedId: "tab3" });
  return (
    <>
      <TabList {...tab} aria-label="My tabs">
        <Tab {...tab}>Tab 1</Tab>
        <Tab {...tab} disabled>
          Tab 2
        </Tab>
        <Tab {...tab} id="tab3">
          Tab 3
        </Tab>
      </TabList>
      <TabPanel {...tab}>Tab 1</TabPanel>
      <TabPanel {...tab}>Tab 2</TabPanel>
      <TabPanel {...tab}>Tab 3</TabPanel>
    </>
  );
}
```

Note that `Tab` automatically generates an `id` if you don't specify one. In this example, an `id` is explicitly assigned for the third tab, so that the same value can be specified as the `selectedId`. No `id` is assigned for the other tabs. The automatically generated `id`s are fine, since we don't need to reference them.

### No selected tab

By default, the first tab will be selected, but you can unset it by passing `null` to `selectedId` on `useTabState`.

```jsx
import { useTabState, Tab, TabList, TabPanel } from "reakit/Tab";

function Example() {
  const tab = useTabState({ selectedId: null });
  return (
    <>
      <TabList {...tab} aria-label="My tabs">
        <Tab {...tab}>Tab 1</Tab>
        <Tab {...tab}>Tab 2</Tab>
        <Tab {...tab}>Tab 3</Tab>
      </TabList>
      <TabPanel {...tab}>Tab 1</TabPanel>
      <TabPanel {...tab}>Tab 2</TabPanel>
      <TabPanel {...tab}>Tab 3</TabPanel>
    </>
  );
}
```

### Manual activation

By default, a `Tab` is selected when it gets focused, which reveals its corresponding `TabPanel`. This behavior can be changed by setting `manual` to `true` on `useTabState`.

```jsx
import { useTabState, Tab, TabList, TabPanel } from "reakit/Tab";

function Example() {
  const tab = useTabState({ manual: true });
  return (
    <>
      <TabList {...tab} aria-label="My tabs">
        <Tab {...tab}>Tab 1</Tab>
        <Tab {...tab}>Tab 2</Tab>
        <Tab {...tab}>Tab 3</Tab>
      </TabList>
      <TabPanel {...tab}>Tab 1</TabPanel>
      <TabPanel {...tab}>Tab 2</TabPanel>
      <TabPanel {...tab}>Tab 3</TabPanel>
    </>
  );
}
```

### Detecting the selected tab

On each render, `selectedId` from `useTabState` specifies which tab is currently selected. You can check it and alter your render accordingly. For example, since only the panel for the selected tab is visible, you can avoid rendering the contents of the other ones as an optimization.

```jsx
import { useTabState, Tab, TabList, TabPanel } from "reakit/Tab";

function Example() {
  const tab = useTabState();
  return (
    <>
      <TabList {...tab} aria-label="My tabs">
        <Tab {...tab} id="tab1">
          Tab 1
        </Tab>
        <Tab {...tab} id="tab2">
          Tab 2
        </Tab>
        <Tab {...tab} id="tab3">
          Tab 3
        </Tab>
      </TabList>
      <TabPanel {...tab}>{tab.selectedId === "tab1" && "Tab 1"}</TabPanel>
      <TabPanel {...tab}>{tab.selectedId === "tab2" && "Tab 2"}</TabPanel>
      <TabPanel {...tab}>{tab.selectedId === "tab3" && "Tab 3"}</TabPanel>
    </>
  );
}
```

### Non-tabbable tab panels

By default, `TabPanel`s are tabbable. You can disable this by passing a `tabIndex` prop to the `TabPanel`: either `-1` to make it not tababble but still focusable, or `undefined` to make it neither tabbable nor focusable.

```jsx
import { useTabState, Tab, TabList, TabPanel } from "reakit/Tab";
import { Button } from "reakit/Button";

function Example() {
  const tab = useTabState();
  return (
    <>
      <TabList {...tab} aria-label="My tabs">
        <Tab {...tab}>Tab 1</Tab>
        <Tab {...tab}>Tab 2</Tab>
        <Tab {...tab}>Tab 3</Tab>
      </TabList>
      <TabPanel {...tab}>Tab 1</TabPanel>
      <TabPanel {...tab} tabIndex={undefined}>
        <Button>Button</Button>
      </TabPanel>
      <TabPanel {...tab}>Tab 3</TabPanel>
    </>
  );
}
```

You should only do this if the contents of the `TabPanel` are tabbable.

### Vertical tabs

You can control the orientation of the tabs by setting `orientation` on `useTabState`. Since it composes from [CompositeItem](/docs/composite/), explicitly defining an orientation will change how arrow key navigation works. If it's set to `vertical`, only <kbd>↑</kbd> and <kbd>↓</kbd> will work.

```jsx
import { useTabState, Tab, TabList, TabPanel } from "reakit/Tab";

function Example() {
  const tab = useTabState({ orientation: "vertical" });
  return (
    <div style={{ display: "flex" }}>
      <TabList {...tab} aria-label="My tabs">
        <Tab {...tab}>Tab 1</Tab>
        <Tab {...tab}>Tab 2</Tab>
        <Tab {...tab}>Tab 3</Tab>
      </TabList>
      <TabPanel {...tab}>Tab 1</TabPanel>
      <TabPanel {...tab}>Tab 2</TabPanel>
      <TabPanel {...tab}>Tab 3</TabPanel>
    </div>
  );
}
```

### Abstracting

Like all other Reakit components, you can leverage the low level API to create your own customized API and make it less verbose, for example, by using React Context underneath.

```jsx
import React from "react";
import {
  useTabState,
  Tab as BaseTab,
  TabList as BaseTabList,
  TabPanel as BaseTabPanel,
} from "reakit/Tab";

const TabsContext = React.createContext();

function Tabs({ children, ...initialState }) {
  const tab = useTabState(initialState);
  const value = React.useMemo(() => tab, Object.values(tab));
  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
}

function Tab(props) {
  const tab = React.useContext(TabsContext);
  return <BaseTab {...tab} {...props} />;
}

function TabList(props) {
  const tab = React.useContext(TabsContext);
  return <BaseTabList {...tab} {...props} />;
}

function TabPanel(props) {
  const tab = React.useContext(TabsContext);
  return <BaseTabPanel {...tab} {...props} />;
}

function Example() {
  return (
    <Tabs selectedId="tab3">
      <TabList aria-label="My tabs">
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab id="tab3">Tab 3</Tab>
      </TabList>
      <TabPanel>Tab 1</TabPanel>
      <TabPanel>Tab 2</TabPanel>
      <TabPanel>Tab 3</TabPanel>
    </Tabs>
  );
}
```

## Accessibility

- `Tab` has role `tab`.
- `Tab` has `aria-controls` referring to its associated `TabPanel`.
- The selected `Tab` has `aria-selected` set to `true` and all other `Tab`s have it set to `false`.
- `Tab` extends the accessibility features of [CompositeItem](/docs/composite/#accessibility).
- `TabList` has role `tablist`.
- `TabList` has `aria-orientation` set to `vertical` or `horizontal` based on the value of the `orientation` option.
- `TabList` extends the accessibility features of [Composite](/docs/composite/#accessibility).
- `TabPanel` has role `tabpanel`.
- `TabPanel` has `aria-labelledby` referring to its associated `Tab`.
- `TabPanel` extends the accessibility features of [DisclosureContent](/docs/disclosure/#accessibility).

Learn more in [Accessibility](/docs/accessibility/).

## Composition

- `Tab` uses [CompositeItem](/docs/composite/).
- `TabList` uses [Composite](/docs/composite/).
- `TabPanel` uses [DisclosureContent](/docs/disclosure/).

Learn more in [Composition](/docs/composition/#props-hooks).

## Props

<!-- Automatically generated -->

### `useTabState`

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

- **`selectedId`**
  <code>string | null | undefined</code>

  The current selected tab's `id`.

- **`manual`**
  <code>boolean</code>

  Whether the tab selection should be manual.

### `Tab`

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

- **`first`**
  <code>() =&#62; void</code>

  Moves focus to the first item.

- **`last`**
  <code>() =&#62; void</code>

  Moves focus to the last item.

- **`manual`**
  <code>boolean</code>

  Whether the tab selection should be manual.

- **`selectedId`**
  <code>string | null | undefined</code>

  The current selected tab's `id`.

- **`panels`**
  <code>Item[]</code>

  Lists all the panels.

- **`select`**
  <code>(id: string | null) =&#62; void</code>

  Moves into and selects a tab by its `id`.

</details>

### `TabList`

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

- **`move`**
  <code>(id: string | null) =&#62; void</code>

  Moves focus to a given item ID.

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

</details>

### `TabPanel`

- **`id`**
  <code>string | undefined</code>

  Same as the HTML attribute.

- **`tabId`**
  <code>string | undefined</code>

  Tab's id

<details><summary>10 state props</summary>

> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`baseId`**
  <code>string</code>

  ID that will serve as a base for all the items IDs.

- **`visible`**
  <code>boolean</code>

  Whether it's visible or not.

- **`animating`**
  <code>boolean</code>

  Whether it's animating or not.

- **`animated`**
  <code>number | boolean</code>

  If `true`, `animating` will be set to `true` when `visible` is updated.
It'll wait for `stopAnimation` to be called or a CSS transition ends.
If `animated` is set to a `number`, `stopAnimation` will be called only
after the same number of milliseconds have passed.

- **`stopAnimation`**
  <code>() =&#62; void</code>

  Stops animation. It's called automatically if there's a CSS transition.

- **`selectedId`**
  <code>string | null | undefined</code>

  The current selected tab's `id`.

- **`items`**
  <code>Item[]</code>

  Lists all the composite items with their `id`, DOM `ref`, `disabled` state
and `groupId` if any. This state is automatically updated when
`registerItem` and `unregisterItem` are called.

- **`panels`**
  <code>Item[]</code>

  Lists all the panels.

- **`registerPanel`**
  <code>(item: Item) =&#62; void</code>

  Registers a tab panel.

- **`unregisterPanel`**
  <code>(id: string) =&#62; void</code>

  Unregisters a tab panel.

</details>
