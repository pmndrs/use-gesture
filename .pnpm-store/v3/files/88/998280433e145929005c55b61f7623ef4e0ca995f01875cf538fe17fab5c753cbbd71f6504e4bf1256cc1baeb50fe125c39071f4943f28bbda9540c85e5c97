---
path: /docs/id/
experimental: true
---

# Id

<blockquote experimental="true">

  **This is experimental** and may introduce **breaking changes** or be **removed altogether** in patch and minor versions without notice. Learn more in [Experimental features](/docs/experimental/).

</blockquote>

`Id` is a component that renders an element with an automatically generated `id` attribute that is consistent across server and client. It's used by several other components.

<carbon-ad></carbon-ad>

## Installation

```sh
npm install reakit
```

Learn more in [Get started](/docs/get-started/).

## Usage

```jsx
import {
  unstable_IdProvider as IdProvider,
  unstable_Id as Id,
} from "reakit/Id";

function Example() {
  return (
    <IdProvider>
      <Id>{(props) => <div {...props}>{props.id}</div>}</Id>
      <Id>{(props) => <div {...props}>{props.id}</div>}</Id>
    </IdProvider>
  );
}
```

### `useIdState`

```jsx
import {
  unstable_useIdState as useIdState,
  unstable_Id as Id,
} from "reakit/Id";

function Example() {
  const id = useIdState({ baseId: "a" });
  return (
    <>
      <Id {...id}>{(props) => <div {...props}>{props.id}</div>}</Id>
      <Id {...id}>{(props) => <div {...props}>{props.id}</div>}</Id>
      <Id {...id} id="different-id">
        {(props) => <div {...props}>{props.id}</div>}
      </Id>
      <Id {...id}>{(props) => <div {...props}>{props.id}</div>}</Id>
    </>
  );
}
```

### `useId`

```jsx
import {
  unstable_IdProvider as IdProvider,
  unstable_useId as useId,
} from "reakit/Id";

function Item(props) {
  const { id } = useId(props);
  return (
    <div {...props} id={id}>
      {id}
    </div>
  );
}

function Example() {
  return (
    <IdProvider prefix="a">
      <Item />
      <Item />
      <Item id="different-id" />
      <Item />
    </IdProvider>
  );
}
```

## Accessibility

`Id` renders unique and consistent `id` attributes so they can be used in several `aria-` props.

Learn more in [Accessibility](/docs/accessibility/).

## Composition

- `Id` is used by [CompositeGroup](/docs/composite/), [CompositeItem](/docs/composite/) and [TabPanel](/docs/tab/).

Learn more in [Composition](/docs/composition/#props-hooks).

## Props

<!-- Automatically generated -->

### `useIdState`

- **`baseId`**
  <code>string</code>

  ID that will serve as a base for all the items IDs.

### `Id`

- **`id`**
  <code>string | undefined</code>

  Same as the HTML attribute.

<details><summary>1 state props</summary>

> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`baseId`**
  <code>string</code>

  ID that will serve as a base for all the items IDs.

</details>
