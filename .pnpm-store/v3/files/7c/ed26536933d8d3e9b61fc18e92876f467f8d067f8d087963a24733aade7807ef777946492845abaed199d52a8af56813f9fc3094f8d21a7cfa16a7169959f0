---
path: /docs/tabbable/
---

# Tabbable

`Tabbable` is an abstract component that makes elements perceivable for keyboard users.

> If you also want to make a tabbable element clickable with <kbd>Enter</kbd> and <kbd>Space</kbd>, see [Clickable](/docs/clickable).

<carbon-ad></carbon-ad>

## Installation

```sh
npm install reakit
```

Learn more in [Get started](/docs/get-started/).

## Usage

```jsx
import { Tabbable } from "reakit/Tabbable";

function Example() {
  return (
    <>
      <Tabbable>Tabbable</Tabbable>
      <Tabbable disabled>Disabled</Tabbable>
      <Tabbable disabled focusable>
        Focusable
      </Tabbable>
    </>
  );
}
```

## Accessibility

- `Tabbable` has `tabindex` set to `0` by default. If it's `disabled` and not `focusable`, the `tabindex` attribute is removed.
- `Tabbable` has `aria-disabled` set to `true` when the `disabled` prop is passed in.
- `click`, `mouseDown` and `mouseOver` events aren't triggered when the `disabled` prop is passed in.
- Focus is automatically set on `Tabbable` when it's clicked, which prevents inconsistencies between browsers.

Learn more in [Accessibility](/docs/accessibility/).

## Composition

- `Tabbable` uses [Role](/docs/role/), and is used by [Clickable](/docs/clickable/), [Composite](/docs/composite/), and [FormInput](/docs/form/).

Learn more in [Composition](/docs/composition/#props-hooks).

## Props

<!-- Automatically generated -->

### `Tabbable`

- **`disabled`**
  <code>boolean | undefined</code>

  Same as the HTML attribute.

- **`focusable`**
  <code>boolean | undefined</code>

  When an element is `disabled`, it may still be `focusable`. It works
similarly to `readOnly` on form elements. In this case, only
`aria-disabled` will be set.
