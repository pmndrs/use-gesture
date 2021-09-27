---
path: /docs/button/
redirect_from:
  - /components/button/
---

# Button

Accessible `Button` component that enables users to trigger an action or event, such as submitting a [Form](/docs/form/), opening a [Dialog](/docs/dialog/), canceling an action, or performing a delete operation. It follows the [WAI-ARIA Button Pattern](https://www.w3.org/TR/wai-aria-practices/#button).

<carbon-ad></carbon-ad>

## Installation

```sh
npm install reakit
```

Learn more in [Get started](/docs/get-started/).

## Usage

```jsx
import { Button } from "reakit/Button";

function Example() {
  return <Button>Button</Button>;
}
```

## Styling

Reakit components are unstyled by default. You're free to use whatever approach you want. Each component returns a single HTML element that accepts all HTML props, including `className` and `style`.

> The example below uses [Emotion](https://emotion.sh/docs/introduction). But these styles can be reproduced using static CSS and other CSS-in-JS libraries, such as [styled-components](https://styled-components.com/).

```jsx unstyled
import { Button } from "reakit/Button";
import { css } from "emotion";

const className = css`
  outline: 0;
  color: #ffffff;
  background: #006dff;
  padding: 0.375em 0.75em;
  line-height: 1.5;
  border: transparent;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 16px;

  &:focus {
    box-shadow: 0 0 0 0.2em rgba(0, 109, 255, 0.4);
  }

  &[disabled],
  &[aria-disabled="true"] {
    cursor: auto;
    opacity: 0.5;
  }

  &:not([disabled]),
  &:not([aria-disabled="true"]) {
    &:hover {
      color: #ffffff;
      background-color: #0062e6;
    }
    &:active,
    &[data-active="true"] {
      color: #ffffff;
      background-color: #004eb8;
    }
  }
`;

function Example() {
  return <Button className={className}>Button</Button>;
}
```

Learn more in [Styling](/docs/styling/).

## Accessibility

- `Button` has role `button`.
- When `Button` has focus, <kbd>Space</kbd> and <kbd>Enter</kbd> activates it.

  <!-- eslint-disable no-alert -->

  ```jsx
  import { Button } from "reakit/Button";

  function Example() {
    return (
      <Button as="div" onClick={() => alert("clicked")}>
        Button
      </Button>
    );
  }
  ```

- If `disabled` prop is `true`, `Button` has `disabled` and `aria-disabled` attributes set to `true`.

  <!-- eslint-disable no-alert -->

  ```jsx
  import { Button } from "reakit/Button";

  function Example() {
    return (
      <Button disabled onClick={() => alert("clicked")}>
        Button
      </Button>
    );
  }
  ```

- If `disabled` and `focusable` props are `true`, `Button` has `aria-disabled` attribute set to `true`, but not `disabled`.

  <!-- eslint-disable no-alert -->

  ```jsx
  import { Button } from "reakit/Button";

  function Example() {
    return (
      <Button disabled focusable onClick={() => alert("clicked")}>
        Button
      </Button>
    );
  }
  ```

  This is useful when the presence of a `Button` is important enough so users can perceive it by tabbing.

Learn more in [Accessibility](/docs/accessibility/).

## Composition

- `Button` uses [Clickable](/docs/clickable/), and is used by [FormPushButton](/docs/form/), [FormRemoveButton](/docs/form/), [Disclosure](/docs/disclosure/) and all their derivatives.

Learn more in [Composition](/docs/composition/#props-hooks).

## Props

<!-- Automatically generated -->

### `Button`

- **`disabled`**
  <code>boolean | undefined</code>

  Same as the HTML attribute.

- **`focusable`**
  <code>boolean | undefined</code>

  When an element is `disabled`, it may still be `focusable`. It works
similarly to `readOnly` on form elements. In this case, only
`aria-disabled` will be set.
