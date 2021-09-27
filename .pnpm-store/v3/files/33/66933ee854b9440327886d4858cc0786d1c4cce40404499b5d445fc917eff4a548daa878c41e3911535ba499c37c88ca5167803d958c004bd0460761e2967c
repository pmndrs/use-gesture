---
path: /docs/clickable/
---

# Clickable

`Clickable` is an abstract component that implements all the interactions an interactive element needs to be fully accessible when it's not rendered as its respective native element.

<carbon-ad></carbon-ad>

## Installation

```sh
npm install reakit
```

Learn more in [Get started](/docs/get-started/).

## Usage

<!-- eslint-disable no-alert -->

```jsx
import { Clickable } from "reakit/Clickable";

function Example() {
  const onClick = () => alert("clicked");
  return (
    <>
      <Clickable as="div" onClick={onClick}>
        Clickable
      </Clickable>
      <Clickable as="div" onClick={onClick} disabled>
        Disabled
      </Clickable>
      <Clickable as="div" onClick={onClick} disabled focusable>
        Focusable
      </Clickable>
    </>
  );
}
```

## Accessibility

- Pressing <kbd>Enter</kbd> or <kbd>Space</kbd> triggers a click event on `Clickable` regardless of its rendered element.
- `Clickable` extends the accessibility features of [Tabbable](/docs/tabbable/#accessibility).

Learn more in [Accessibility](/docs/accessibility/).

## Composition

- `Clickable` uses [Tabbable](/docs/tabbable/), and is used by [Button](/docs/button/), [Checkbox](/docs/checkbox/), and [CompositeItem](/docs/composite/).

Learn more in [Composition](/docs/composition/#props-hooks).

## Props

<!-- Automatically generated -->

### `Clickable`

- **`disabled`**
  <code>boolean | undefined</code>

  Same as the HTML attribute.

- **`focusable`**
  <code>boolean | undefined</code>

  When an element is `disabled`, it may still be `focusable`. It works
similarly to `readOnly` on form elements. In this case, only
`aria-disabled` will be set.
