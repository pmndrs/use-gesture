---
path: /docs/checkbox/
---

# Checkbox

Accessible `Checkbox` component that follows the [WAI-ARIA Checkbox Pattern](https://www.w3.org/TR/wai-aria-practices/#checkbox), which means you'll have a working dual or tri-state toggle button regardless of the type of the underlying element. By default, it renders the native `<input type="checkbox">`.

<carbon-ad></carbon-ad>

## Installation

```sh
npm install reakit
```

Learn more in [Get started](/docs/get-started/).

## Usage

It receives the same props as [controlled inputs](https://reactjs.org/docs/forms.html), such as `checked` and `onChange`:

```jsx
import React from "react";
import { Checkbox } from "reakit/Checkbox";

function Example() {
  const [checked, setChecked] = React.useState(false);
  const toggle = () => setChecked(!checked);
  return (
    <label>
      <Checkbox checked={checked} onChange={toggle} />
      Checkbox
    </label>
  );
}
```

### Rendering as a different element

You can render `Checkbox` as any component. Reakit will ensure that it's accessible by adding proper ARIA attributes and event handlers.

> When styling, instead of using `:checked` or the `[checked]` selector, you will have to use `[aria-checked="true"]` to select non-native checked checkboxes.

```jsx
import React from "react";
import { Checkbox } from "reakit/Checkbox";
import { Button } from "reakit/Button";

function Example() {
  const [checked, setChecked] = React.useState(false);
  const toggle = () => setChecked(!checked);
  return (
    <Checkbox as={Button} checked={checked} onChange={toggle}>
      {checked ? "Uncheck" : "Check"}
    </Checkbox>
  );
}
```

### `useCheckboxState`

For convenience and consistency with the other components, Reakit provides a `useCheckboxState` that already implements the state logic for you:

```jsx
import { useCheckboxState, Checkbox } from "reakit/Checkbox";

function Example() {
  const checkbox = useCheckboxState({ state: true });
  return (
    <label>
      <Checkbox {...checkbox} />
      Checkbox
    </label>
  );
}
```

### Multiple checkboxes

Oftentimes we need to render multiple checkboxes and store the checked values in an array. It can be easily done with Reakit:

```jsx
import { useCheckboxState, Checkbox } from "reakit/Checkbox";

function Example() {
  const checkbox = useCheckboxState({ state: [] });
  return (
    <>
      <div>Choices: {checkbox.state.join(", ")}</div>
      <label>
        <Checkbox {...checkbox} value="apple" />
        Apple
      </label>
      <label>
        <Checkbox {...checkbox} value="orange" />
        Orange
      </label>
      <label>
        <Checkbox {...checkbox} value="watermelon" />
        Watermelon
      </label>
    </>
  );
}
```

### Indeterminate or mixed state

You can programmatically set checkbox value as `indeterminate`:

```jsx
import React from "react";
import { Checkbox, useCheckboxState } from "reakit/Checkbox";

function useTreeState({ values }) {
  const group = useCheckboxState();
  const items = useCheckboxState();

  // updates items when group is toggled
  React.useEffect(() => {
    if (group.state === true) {
      items.setState(values);
    } else if (group.state === false) {
      items.setState([]);
    }
  }, [group.state]);

  // updates group when items is toggled
  React.useEffect(() => {
    if (items.state.length === values.length) {
      group.setState(true);
    } else if (items.state.length) {
      group.setState("indeterminate");
    } else {
      group.setState(false);
    }
  }, [items.state]);

  return { group, items };
}

function Example() {
  const values = ["Apple", "Orange", "Watermelon"];
  const { group, items } = useTreeState({ values });
  return (
    <ul>
      <li>
        <label>
          <Checkbox {...group} /> Fruits
        </label>
      </li>
      <ul>
        {values.map((value, i) => (
          <li key={i}>
            <label>
              <Checkbox {...items} value={value} /> {value}
            </label>
          </li>
        ))}
      </ul>
    </ul>
  );
}
```

## Styling

Reakit components are [un-styled by default](/docs/styling/). Each component returns a single HTML element that accepts all HTML props, including `className` and `style`.

> The example below uses [Emotion](https://emotion.sh/docs/introduction). But these styles can be reproduced using static CSS and other CSS-in-JS libraries, such as [styled-components](https://styled-components.com/).

```jsx unstyled
import * as React from "react";
import { Checkbox } from "reakit/Checkbox";
import { css } from "emotion";

const labelStyle = css`
  display: flex;
  align-items: center;
`;

const checkboxStyle = css`
  appearance: none;
  border: 1px solid #a860ff;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  &:after {
    content: "✔";
    display: none;
    color: white;
    font-size: 70%;
  }
  &:checked {
    background-color: #6a50ee;
    border: 2px solid #a860ff;
    &:after {
      display: block;
    }
  }
`;

function Example() {
  const [checked, setChecked] = React.useState(false);
  const toggle = () => setChecked(!checked);
  return (
    <label className={labelStyle}>
      <Checkbox checked={checked} onChange={toggle} className={checkboxStyle} />
      Checkbox
    </label>
  );
}
```

## Accessibility

- `Checkbox` has role `checkbox`.
- When checked, `Checkbox` has `aria-checked` set to `true`.
- When not checked, `Checkbox` has `aria-checked` set to `false`.
- When partially checked, `Checkbox` has `aria-checked` set to `mixed`.

Learn more in [Accessibility](/docs/accessibility/).

## Composition

- `Checkbox` uses [Clickable](/docs/clickable/), and is used by [FormCheckbox](/docs/form/) and [MenuItemCheckbox](/docs/menu/).

Learn more in [Composition](/docs/composition/#props-hooks).

## Props

<!-- Automatically generated -->

### `useCheckboxState`

- **`state`**
  <code>boolean | &#34;indeterminate&#34; | (string | number)[]</code>

  Stores the state of the checkbox.
If checkboxes that share this state have defined a `value` prop, it's
going to be an array.

### `Checkbox`

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

<details><summary>2 state props</summary>

> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`state`**
  <code>boolean | &#34;indeterminate&#34; | (string | number)[]</code>

  Stores the state of the checkbox.
If checkboxes that share this state have defined a `value` prop, it's
going to be an array.

- **`setState`**
  <code title="(value: SetStateAction&#60;boolean | &#34;indeterminate&#34; | (string | number)[]&#62;) =&#62; void">(value: SetStateAction&#60;boolean | &#34;indeterminate...</code>

  Sets `state`.

</details>
