---
path: /docs/input/
---

# Input

Base `Input` component that enables users to enter text values.
Do not forget to provide accessible names for your inputs.
Or consider using `FormInput` together with `FormLabel` within [Forms](/docs/form/).

<carbon-ad></carbon-ad>

## Installation

```sh
npm install reakit
```

Learn more in [Get started](/docs/get-started/).

## Usage

```jsx
import { Input } from "reakit/Input";

function Example() {
  return <Input placeholder="input" />;
}
```

## Styling

Reakit components are unstyled by default. You're free to use whatever approach you want. Each component returns a single HTML element that accepts all HTML props, including `className` and `style`.

> The example below uses [Emotion](https://emotion.sh/docs/introduction). But these styles can be reproduced using static CSS and other CSS-in-JS libraries, such as [styled-components](https://styled-components.com/).

```jsx unstyled
import { Input } from "reakit/Input";
import { css } from "emotion";

const className = css`
  display: block;
  width: 100%;
  border-radius: 0.2rem;
  padding: 0.5em 0.75em;
  font-size: 100%;
  border: 1px solid rgba(0, 0, 0, 0.25);
  color: #4d4d4d;
  margin: 0 !important;
  box-sizing: border-box;

  &:focus {
    border-color: rgba(0, 0, 0, 0.25);
  }
`;

function Example() {
  return <Input className={className} value="value" placeholder="input" />;
}
```

Learn more in [Styling](/docs/styling/).

## Composition

- `Input` uses [Tabbable](/docs/tabbable/), and is used by [FormInput](/docs/form/) and all their derivatives.

Learn more in [Composition](/docs/composition/#props-hooks).

## Props

<!-- Automatically generated -->

### `Input`

- **`disabled`**
  <code>boolean | undefined</code>

  Same as the HTML attribute.

- **`focusable`**
  <code>boolean | undefined</code>

  When an element is `disabled`, it may still be `focusable`. It works
similarly to `readOnly` on form elements. In this case, only
`aria-disabled` will be set.
