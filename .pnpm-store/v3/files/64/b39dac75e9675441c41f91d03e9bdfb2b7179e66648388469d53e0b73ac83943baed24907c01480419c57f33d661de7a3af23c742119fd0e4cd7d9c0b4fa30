---
path: /docs/rover/
redirect_from:
 - /components/step/
 - /components/step/stepcontainer/
 - /components/step/stephide/
 - /components/step/stepnext/
 - /components/step/stepprevious/
 - /components/step/stepshow/
 - /components/step/steptoggle/
---

# Rover

`Rover` is an abstract component that implements the [roving tabindex](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_roving_tabindex) method to manage focus between items (rovers).

<carbon-ad></carbon-ad>

## Installation

```sh
npm install reakit
```

Learn more in [Get started](/docs/get-started/).

## Usage

```jsx
import { useRoverState, Rover } from "reakit/Rover";
import { Group } from "reakit/Group";
import { Button } from "reakit/Button";

function Example() {
  const rover = useRoverState();
  return (
    <Group>
      <Rover {...rover} as={Button}>
        Button 1
      </Rover>
      <Rover {...rover} as={Button} disabled>
        Button 2
      </Rover>
      <Rover {...rover} as={Button} disabled focusable>
        Button 3
      </Rover>
      <Rover {...rover} as={Button}>
        Button 4
      </Rover>
      <Rover {...rover} as={Button}>
        Button 5
      </Rover>
    </Group>
  );
}
```

### Loop

If you set `loop` to `true` on `useRoverState`, the roving tabindex will loop from the last item to the first item.

```jsx
import { useRoverState, Rover } from "reakit/Rover";

function Example() {
  const rover = useRoverState({ loop: true });
  return (
    <>
      <Rover {...rover}>Button 1</Rover>
      <Rover {...rover}>Button 2</Rover>
      <Rover {...rover}>Button 3</Rover>
      <Rover {...rover}>Button 4</Rover>
      <Rover {...rover}>Button 5</Rover>
    </>
  );
}
```

## Accessibility

- `Rover` has `tabindex` set to `0` if it's the current element. Otherwise `tabindex` is set to `-1`.
- Pressing <kbd>↑</kbd> moves focus to the previous `Rover` if `orientation` is `vertical` or not defined.
- Pressing <kbd>↓</kbd> moves focus to the next `Rover` if `orientation` is `vertical` or not defined.
- Pressing <kbd>→</kbd> moves focus to the next `Rover` if `orientation` is `horizontal` or not defined.
- Pressing <kbd>←</kbd> moves focus to the previous `Rover` if `orientation` is `horizontal` or not defined.
- Pressing <kbd>Home</kbd> or <kbd>PageUp</kbd> moves focus to the first `Rover`.
- Pressing <kbd>End</kbd> or <kbd>PageDown</kbd> moves focus to the last `Rover`.

Learn more in [Accessibility](/docs/accessibility/).

## Composition

- `Rover` uses [Clickable](/docs/clickable/).

Learn more in [Composition](/docs/composition/#props-hooks).

## Props

<!-- Automatically generated -->

### `useRoverState`

- **`baseId`**
  <code>string</code>

  ID that will serve as a base for all the items IDs.

- **`orientation`**
  <code>&#34;horizontal&#34; | &#34;vertical&#34; | undefined</code>

  Defines the orientation of the rover list.

- **`currentId`**
  <code>string | null</code>

  The current focused element ID.

- **`loop`**
  <code>boolean</code>

  If enabled:
  - Jumps to the first item when moving next from the last item.
  - Jumps to the last item when moving previous from the first item.

### `Rover`

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

- **`stopId`**
  <code>string | undefined</code>

  Element ID.

<details><summary>12 state props</summary>

> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`baseId`**
  <code>string</code>

  ID that will serve as a base for all the items IDs.

- **`orientation`**
  <code>&#34;horizontal&#34; | &#34;vertical&#34; | undefined</code>

  Defines the orientation of the rover list.

- **`unstable_moves`** <span title="Experimental">⚠️</span>
  <code>number</code>

  Stores the number of moves that have been made by calling `move`, `next`,
`previous`, `first` or `last`.

- **`currentId`**
  <code>string | null</code>

  The current focused element ID.

- **`stops`**
  <code>Stop[]</code>

  A list of element refs and IDs of the roving items.

- **`register`**
  <code>(id: string, ref: RefObject&#60;HTMLElement&#62;) =&#62; void</code>

  Registers the element ID and ref in the roving tab index list.

- **`unregister`**
  <code>(id: string) =&#62; void</code>

  Unregisters the roving item.

- **`move`**
  <code title="(id: string | null, unstable_silent?: boolean | undefined) =&#62; void">(id: string | null, unstable_silent?: boolean |...</code>

  Moves focus to a given element ID.

- **`next`**
  <code>() =&#62; void</code>

  Moves focus to the next element.

- **`previous`**
  <code>() =&#62; void</code>

  Moves focus to the previous element.

- **`first`**
  <code>() =&#62; void</code>

  Moves focus to the first element.

- **`last`**
  <code>() =&#62; void</code>

  Moves focus to the last element.

</details>
