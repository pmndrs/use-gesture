---
path: /docs/tooltip/
redirect_from:
  - /components/tooltip/
  - /components/tooltip/tooltiparrow/
---

# Tooltip

`Tooltip` follows the [WAI-ARIA Tooltip Pattern](https://www.w3.org/TR/wai-aria-practices/#tooltip). It's a popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.

<carbon-ad></carbon-ad>

## Installation

```sh
npm install reakit
```

Learn more in [Get started](/docs/get-started/).

## Usage

```jsx
import { Button } from "reakit/Button";
import { Tooltip, TooltipReference, useTooltipState } from "reakit/Tooltip";

function Example() {
  const tooltip = useTooltipState();
  return (
    <>
      <TooltipReference {...tooltip} as={Button}>
        Reference
      </TooltipReference>
      <Tooltip {...tooltip}>Tooltip</Tooltip>
    </>
  );
}
```

### Placement

Since `Tooltip` is composed by [Popover](/docs/popover/), you can control how it is positioned by setting the `placement` option on `useTooltipState`.

```jsx
import { Button } from "reakit/Button";
import { Tooltip, TooltipReference, useTooltipState } from "reakit/Tooltip";

function Example() {
  const tooltip = useTooltipState({ placement: "bottom-end" });
  return (
    <>
      <TooltipReference {...tooltip} as={Button}>
        Reference
      </TooltipReference>
      <Tooltip {...tooltip}>Tooltip</Tooltip>
    </>
  );
}
```

### Multiple tooltips

Each group of `Tooltip` and `TooltipReference` should have its own corresponding `useTooltipState`.

```jsx
import { Button } from "reakit/Button";
import { Tooltip, TooltipReference, useTooltipState } from "reakit/Tooltip";

function Example() {
  const tooltip1 = useTooltipState();
  const tooltip2 = useTooltipState();
  return (
    <>
      <TooltipReference {...tooltip1} as={Button}>
        Reference 1
      </TooltipReference>
      <Tooltip {...tooltip1}>Tooltip 1</Tooltip>
      <TooltipReference {...tooltip2} as={Button}>
        Reference 2
      </TooltipReference>
      <Tooltip {...tooltip2}>Tooltip 2</Tooltip>
    </>
  );
}
```

### Animating

`Tooltip` uses [DisclosureContent](/docs/disclosure/) underneath, so you can use the same approaches as described in the [Animating](/docs/disclosure/#animating) section there.

The only difference is that Reakit automatically adds inline styles to the `Tooltip` element so that it's correctly positioned according to `TooltipReference`. In this example, we're animating an inner wrapper element, so we don't need to overwrite `Tooltip` positioning styles.

```jsx
import { css } from "emotion";
import { Button } from "reakit/Button";
import {
  useTooltipState,
  Tooltip,
  TooltipArrow,
  TooltipReference,
} from "reakit/Tooltip";

const styles = css`
  background-color: rgba(33, 33, 33, 0.9);
  padding: 8px;
  border-radius: 4px;
  transition: opacity 250ms ease-in-out, transform 250ms ease-in-out;
  opacity: 0;
  transform-origin: top center;
  transform: translate3d(0, -20px, 0);
  [data-enter] & {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

function Example() {
  const tooltip = useTooltipState({ animated: 250 });
  return (
    <>
      <TooltipReference {...tooltip} as={Button}>
        Reference
      </TooltipReference>
      <Tooltip {...tooltip} style={{ background: "none", padding: 0 }}>
        <div className={styles}>
          <TooltipArrow {...tooltip} />
          Tooltip
        </div>
      </Tooltip>
    </>
  );
}
```

### Abstracting

You can build your own `Tooltip` component with a different API on top of Reakit.

```jsx
import React from "react";
import {
  useTooltipState,
  Tooltip as ReakitTooltip,
  TooltipReference,
} from "reakit/Tooltip";

function Tooltip({ children, title, ...props }) {
  const tooltip = useTooltipState();
  return (
    <>
      <TooltipReference {...tooltip} ref={children.ref} {...children.props}>
        {(referenceProps) => React.cloneElement(children, referenceProps)}
      </TooltipReference>
      <ReakitTooltip {...tooltip} {...props}>
        {title}
      </ReakitTooltip>
    </>
  );
}

function Example() {
  return (
    <Tooltip title="Tooltip">
      <button>Reference</button>
    </Tooltip>
  );
}
```

## Accessibility

- `Tooltip` has role `tooltip`.
- `TooltipReference` has `aria-describedby` referring to `Tooltip`.
- <kbd>Escape</kbd> hides the current visible tooltip.

Learn more in [Accessibility](/docs/accessibility/).

## Composition

- `Tooltip` uses [DisclosureContent](/docs/disclosure/).
- `TooltipArrow` uses [PopoverArrow](/docs/popover/).
- `TooltipReference` uses [Role](/docs/role/).

Learn more in [Composition](/docs/composition/#props-hooks).

## Props

<!-- Automatically generated -->

### `useTooltipState`

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

### `Tooltip`

- **`unstable_portal`** <span title="Experimental">⚠️</span>
  <code>boolean | undefined</code>

  Whether or not the tooltip should be rendered within `Portal`.

<details><summary>5 state props</summary>

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

- **`animating`**
  <code>boolean</code>

  Whether it's animating or not.

- **`stopAnimation`**
  <code>() =&#62; void</code>

  Stops animation. It's called automatically if there's a CSS transition.

</details>

### `TooltipArrow`

- **`size`**
  <code>string | number | undefined</code>

  Arrow's size

<details><summary>1 state props</summary>

> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`placement`**
  <code title="&#34;auto-start&#34; | &#34;auto&#34; | &#34;auto-end&#34; | &#34;top-start&#34; | &#34;top&#34; | &#34;top-end&#34; | &#34;right-start&#34; | &#34;right&#34; | &#34;right-end&#34; | &#34;bottom-end&#34; | &#34;bottom&#34; | &#34;bottom-start&#34; | &#34;left-end&#34; | &#34;left&#34; | &#34;left-start&#34;">&#34;auto-start&#34; | &#34;auto&#34; | &#34;auto-end&#34; | &#34;top-start...</code>

  Actual `placement`.

</details>

### `TooltipReference`

<details><summary>4 state props</summary>

> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`baseId`**
  <code>string</code>

  ID that will serve as a base for all the items IDs.

- **`unstable_referenceRef`** <span title="Experimental">⚠️</span>
  <code>RefObject&#60;HTMLElement | null&#62;</code>

  The reference element.

- **`show`**
  <code>() =&#62; void</code>

  Changes the `visible` state to `true`

- **`hide`**
  <code>() =&#62; void</code>

  Changes the `visible` state to `false`

</details>
