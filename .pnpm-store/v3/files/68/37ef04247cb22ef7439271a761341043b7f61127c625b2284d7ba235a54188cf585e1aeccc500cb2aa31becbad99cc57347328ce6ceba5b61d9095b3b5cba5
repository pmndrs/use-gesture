---
path: /docs/disclosure/
redirect_from:
  - /components/hidden/
  - /components/hidden/hiddencontainer/
  - /components/hidden/hiddenhide/
  - /components/hidden/hiddenshow/
  - /components/hidden/hiddentoggle/
---

# Disclosure

Accessible `Disclosure` component that controls visibility of a section of content. It follows the [WAI-ARIA Disclosure Pattern](https://www.w3.org/TR/wai-aria-practices/#disclosure).

<carbon-ad></carbon-ad>

## Installation

```sh
npm install reakit
```

Learn more in [Get started](/docs/get-started/).

## Usage

```jsx
import {
  useDisclosureState,
  Disclosure,
  DisclosureContent,
} from "reakit/Disclosure";

function Example() {
  const disclosure = useDisclosureState({ visible: true });
  return (
    <>
      <Disclosure {...disclosure}>Toggle</Disclosure>
      <DisclosureContent {...disclosure}>Content</DisclosureContent>
    </>
  );
}
```

### Conditionally rendering

You shouldn't conditionally render the `DisclosureContent` component as this will make some Reakit features not work. Instead, you can use [render props](/docs/composition/#render-props) and conditionally render the underneath element:

```jsx
import {
  useDisclosureState,
  Disclosure,
  DisclosureContent,
} from "reakit/Disclosure";

function Example() {
  const disclosure = useDisclosureState();
  return (
    <>
      <Disclosure {...disclosure}>Toggle</Disclosure>
      {/* instead of {disclosure.visible && <DisclosureContent {...disclosure}>Content</DisclosureContent>} */}
      <DisclosureContent {...disclosure}>
        {(props) => disclosure.visible && <div {...props}>Content</div>}
      </DisclosureContent>
    </>
  );
}
```

### Multiple components

Each `DisclosureContent` component should have its own `useDisclosureState`. This is also true for derivative modules like [Dialog](/docs/dialog/), [Popover](/docs/popover/), [Menu](/docs/menu/), [Tooltip](/docs/tooltip/) etc.

If you want to have only one `Disclosure` element controling multiple `DisclosureContent` components, you can use [render props](/docs/composition/#render-props) to apply the same state to different `Disclosure`s that will result in a single element.

```jsx
import {
  useDisclosureState,
  Disclosure,
  DisclosureContent,
} from "reakit/Disclosure";

function Example() {
  const disclosure1 = useDisclosureState();
  const disclosure2 = useDisclosureState();
  return (
    <>
      <Disclosure {...disclosure1}>
        {(props) => (
          <Disclosure {...props} {...disclosure2}>
            Toggle All
          </Disclosure>
        )}
      </Disclosure>
      <DisclosureContent {...disclosure1}>Content 1</DisclosureContent>
      <DisclosureContent {...disclosure2}>Content 2</DisclosureContent>
    </>
  );
}
```

### Styling

Reakit components are unstyled by default. You're free to use whatever approach you want. Each component returns a single HTML element that accepts all HTML props, including `className` and `style`.

> The example below uses [Emotion](https://emotion.sh/docs/introduction). But these styles can be reproduced using static CSS and other CSS-in-JS libraries, such as [styled-components](https://styled-components.com/).

```jsx unstyled
import { css } from "emotion";
import {
  useDisclosureState,
  Disclosure,
  DisclosureContent,
} from "reakit/Disclosure";

const styles = css`
  .button {
    line-height: 1.5;
    border: transparent;
    cursor: pointer;
    font-size: 16px;
    border-radius: 0.25rem;
  }
  .button:before {
    display: inline-block;
    content: "►";
    margin: 4px;
  }
  .button[aria-expanded="true"]:before {
    transform: rotateZ(90deg);
  }
  .content {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 8px;
  }
`;

function Example() {
  const disclosure = useDisclosureState();
  return (
    <div className={styles}>
      <Disclosure {...disclosure} className="button">
        Toggle
      </Disclosure>
      <DisclosureContent {...disclosure} className="content">
        Content
      </DisclosureContent>
    </div>
  );
}
```

Learn more on [Styling](/docs/styling/).

### Animating

To perform animations, you must set `animated` to `true` on `useDisclosureState`. It'll enable additional `data-*` props on `DisclosureContent` which you can use as selectors in CSS. It will also ensure that the element will only get hidden when the transition has ended.

Use the `[data-enter]` and `[data-leave]` selectors to style both enter and leave animations. `data-enter` is added shortly after the element is shown so there's an interval for the browser to process the initial styles and understand this as a transition.

```jsx
import { css } from "emotion";
import {
  useDisclosureState,
  Disclosure,
  DisclosureContent,
} from "reakit/Disclosure";

const styles = css`
  .content {
    transition: opacity 250ms ease-in-out, transform 250ms ease-in-out;
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
  .content[data-enter] {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  .content[data-leave] {
    // Uncomment below to have a different leave animation
    // transform: translate3d(0, 100%, 0);
  }
`;

function Example() {
  // Set animated to true
  const disclosure = useDisclosureState({ animated: true });
  return (
    <div className={styles}>
      <Disclosure {...disclosure}>Toggle</Disclosure>
      <DisclosureContent {...disclosure} className="content">
        Content
      </DisclosureContent>
    </div>
  );
}
```

Alternatively, you can set `animated` to a `number` value, so it'll stop the animation and hide the element after that number in milliseconds.

```js static
import { useDisclosureState } from "reakit/Disclosure";

// Hides DisclosureContent after 500 milliseconds after calling disclosure.hide()
const disclosure = useDisclosureState({ animated: 500 });
```

### Manually stopping animations

For transitions that don't use CSS transitions/animations, you must stop the animation manually by calling `disclosure.stopAnimation()`. In the example below, you can see a physics-based animation using [react-spring](https://www.react-spring.io/):

```jsx
import { useSpring, animated } from "react-spring";
import {
  useDisclosureState,
  Disclosure,
  DisclosureContent,
} from "reakit/Disclosure";

function Example() {
  const disclosure = useDisclosureState({ animated: true });
  const { opacity, scale } = useSpring({
    opacity: disclosure.visible ? 1 : 0,
    scale: disclosure.visible ? 1 : 0,
    onRest: disclosure.stopAnimation,
  });
  return (
    <div>
      <Disclosure {...disclosure}>Toggle</Disclosure>
      <DisclosureContent
        {...disclosure}
        as={animated.div}
        style={{
          opacity,
          transformOrigin: "top center",
          transform: scale.interpolate((s) => `scaleY(${s})`),
        }}
      >
        Content
      </DisclosureContent>
    </div>
  );
}
```

## Accessibility

- `Disclosure` extends the accessibility features of [Button](/docs/button/#accessibility).
- `Disclosure` has a value specified for `aria-controls` that refers to `DisclosureContent`.
- When `DisclosureContent` is visible, `Disclosure` has `aria-expanded` set to `true`. When `DisclosureContent` is hidden, it is set to `false`.

Learn more in [Accessibility](/docs/accessibility/).

## Composition

- `Disclosure` uses [Button](/docs/button/), and is used by [DialogDisclosure](/docs/dialog/).
- `DisclosureContent` uses [Role](/docs/role/), and is used by [Dialog](/docs/dialog/), [DialogBackdrop](/docs/dialog/), [TabPanel](/docs/tab/), [Tooltip](/docs/tooltip/) and all their derivatives.

Learn more in [Composition](/docs/composition/#props-hooks).

## Props

<!-- Automatically generated -->

### `useDisclosureState`

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

### `Disclosure`

- **`disabled`**
  <code>boolean | undefined</code>

  Same as the HTML attribute.

- **`focusable`**
  <code>boolean | undefined</code>

  When an element is `disabled`, it may still be `focusable`. It works
similarly to `readOnly` on form elements. In this case, only
`aria-disabled` will be set.

<details><summary>3 state props</summary>

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

</details>

### `DisclosureContent`

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
