---
path: /docs/form/
experimental: true
redirect_from:
  - /components/field/
  - /components/input/
  - /components/label/
---

# Form

<blockquote experimental="true">

  **This is experimental** and may introduce **breaking changes** or be **removed altogether** in patch and minor versions without notice. Learn more in [Experimental features](/docs/experimental/).

</blockquote>

`Form` is an accessible component with a collection of other components, such as `FormLabel` and `FormInput`.

<carbon-ad></carbon-ad>

## Installation

```sh
npm install reakit
```

Learn more in [Get started](/docs/get-started/).

## Usage

<!-- eslint-disable no-alert -->

```jsx
import {
  unstable_useFormState as useFormState,
  unstable_Form as Form,
  unstable_FormLabel as FormLabel,
  unstable_FormInput as FormInput,
  unstable_FormMessage as FormMessage,
  unstable_FormSubmitButton as FormSubmitButton,
} from "reakit/Form";

function Example() {
  const form = useFormState({
    values: { name: "" },
    onValidate: (values) => {
      if (!values.name) {
        const errors = {
          name: "How can we be friends without knowing your name?",
        };
        throw errors;
      }
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Form {...form}>
      <FormLabel {...form} name="name">
        Name
      </FormLabel>
      <FormInput {...form} name="name" placeholder="John Doe" />
      <FormMessage {...form} name="name" />
      <FormSubmitButton {...form}>Submit</FormSubmitButton>
    </Form>
  );
}
```

### Textareas

If your form requires a `textarea` instead of an `input` field, you can use the `as` prop on the `FormInput` component.

<!-- eslint-disable no-alert -->

```jsx
import {
  unstable_useFormState as useFormState,
  unstable_Form as Form,
  unstable_FormLabel as FormLabel,
  unstable_FormInput as FormInput,
  unstable_FormMessage as FormMessage,
  unstable_FormSubmitButton as FormSubmitButton,
} from "reakit/Form";

function Example() {
  const form = useFormState({
    values: { message: "" },
    onValidate: (values) => {
      if (!values.message) {
        const errors = {
          message: "Please enter a message.",
        };
        throw errors;
      }
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Form {...form}>
      <FormLabel {...form} name="message">
        Message
      </FormLabel>
      <FormInput
        {...form}
        name="message"
        placeholder="What's on your mind?"
        as="textarea"
      />
      <FormMessage {...form} name="message" />
      <FormSubmitButton {...form}>Submit</FormSubmitButton>
    </Form>
  );
}
```

### Arrays

`Form` supports array values seamlessly. For convenience, you can reliably use the array indexes as keys on the array fragments.

Focus is managed so adding a new item will move focus to the new input or to the first input if multiple inputs have been added.

<!-- eslint-disable no-alert -->

```jsx
import React from "react";
import {
  unstable_useFormState as useFormState,
  unstable_Form as Form,
  unstable_FormLabel as FormLabel,
  unstable_FormRemoveButton as FormRemoveButton,
  unstable_FormPushButton as FormPushButton,
  unstable_FormSubmitButton as FormSubmitButton,
  unstable_FormInput as FormInput,
  unstable_FormMessage as FormMessage,
} from "reakit/Form";

function Example() {
  const form = useFormState({
    values: {
      people: [{ name: "", email: "" }],
    },
    onValidate: (values) => {
      const errors = {};
      values.people.forEach((value, i) => {
        if (!value.email) {
          if (!errors.people) {
            errors.people = [];
          }
          if (!errors.people[i]) {
            errors.people[i] = {};
          }
          errors.people[i].email =
            "We can't sell data without an email, can we?";
        }
      });
      if (Object.keys(errors).length) {
        throw errors;
      }
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Form {...form}>
      {form.values.people.map((_, i) => (
        <React.Fragment key={i}>
          <FormLabel {...form} name={["people", i, "name"]}>
            Name
          </FormLabel>
          <FormInput {...form} name={["people", i, "name"]} />
          <FormMessage {...form} name={["people", i, "name"]} />
          <FormLabel {...form} name={["people", i, "email"]}>
            Email
          </FormLabel>
          <FormInput {...form} type="email" name={["people", i, "email"]} />
          <FormMessage {...form} name={["people", i, "email"]} />
          <FormRemoveButton {...form} name="people" index={i}>
            Remove person
          </FormRemoveButton>
        </React.Fragment>
      ))}
      <br />
      <br />
      <FormPushButton {...form} name="people" value={{ name: "", email: "" }}>
        Add person
      </FormPushButton>
      <FormSubmitButton {...form}>Submit</FormSubmitButton>
    </Form>
  );
}
```

### Checkbox

With `FormCheckbox`, you can either manage `boolean` values (single checkbox) or `array` values (checkbox group). Error messages can also be displayed.

<!-- eslint-disable no-alert -->

```jsx
import {
  unstable_useFormState as useFormState,
  unstable_Form as Form,
  unstable_FormLabel as FormLabel,
  unstable_FormCheckbox as FormCheckbox,
  unstable_FormGroup as FormGroup,
  unstable_FormSubmitButton as FormSubmitButton,
  unstable_FormMessage as FormMessage,
} from "reakit/Form";

function Example() {
  const form = useFormState({
    values: {
      accepted: false,
      preferences: [],
    },
    onValidate: (values) => {
      const errors = {};
      if (!values.accepted) {
        errors.accepted = "You must accept our not-so-evil conditions!";
      }
      if (!values.preferences.includes("JS")) {
        errors.preferences = "Why not JS? It's so cool! 🙁";
      }
      if (Object.keys(errors).length) {
        throw errors;
      }
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Form {...form}>
      <FormCheckbox {...form} name="accepted" />
      <FormLabel {...form} name="accepted">
        Accept conditions
      </FormLabel>
      <FormMessage {...form} name="accepted" />
      <FormGroup {...form} name="preferences">
        <FormLabel {...form} as="legend" name="preferences">
          Preferences
        </FormLabel>
        <label>
          <FormCheckbox {...form} name="preferences" value="html" /> HTML
        </label>
        <label>
          <FormCheckbox {...form} name="preferences" value="css" /> CSS
        </label>
        <label>
          <FormCheckbox {...form} name="preferences" value="JS" /> JS
        </label>
      </FormGroup>
      <FormMessage {...form} name="preferences" />
      <FormSubmitButton {...form}>Submit</FormSubmitButton>
    </Form>
  );
}
```

### Radio

You can use `FormRadio` and `FormRadioGroup` to manage radio buttons. Error messages can also be displayed.

<!-- eslint-disable no-alert -->

```jsx
import {
  unstable_useFormState as useFormState,
  unstable_Form as Form,
  unstable_FormLabel as FormLabel,
  unstable_FormRadioGroup as FormRadioGroup,
  unstable_FormRadio as FormRadio,
  unstable_FormSubmitButton as FormSubmitButton,
  unstable_FormMessage as FormMessage,
} from "reakit/Form";

function Example() {
  const form = useFormState({
    values: { choice: "" },
    onValidate: (values) => {
      if (values.choice !== "js") {
        const errors = { choice: "YOU WILL BE FIRED!" };
        throw errors;
      }
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Form {...form}>
      <FormRadioGroup {...form} name="choice">
        <FormLabel {...form} as="legend" name="choice">
          Choice
        </FormLabel>
        <label>
          <FormRadio {...form} name="choice" value="html" /> HTML
        </label>
        <label>
          <FormRadio {...form} name="choice" value="css" /> CSS
        </label>
        <label>
          <FormRadio {...form} name="choice" value="js" /> JS
        </label>
      </FormRadioGroup>
      <FormMessage {...form} name="choice" />
      <FormSubmitButton {...form}>Submit</FormSubmitButton>
    </Form>
  );
}
```

### Validating with Yup

[Yup](https://github.com/jquense/yup) is a popular library for object schema validation. You can easily integrate it with Reakit `Form`.

```jsx
import { object, string } from "yup";
import {
  unstable_useFormState as useFormState,
  unstable_Form as Form,
  unstable_FormLabel as FormLabel,
  unstable_FormInput as FormInput,
  unstable_FormMessage as FormMessage,
  unstable_FormSubmitButton as FormSubmitButton,
} from "reakit/Form";
import set from "lodash/set";

const schema = object({
  name: string()
    .min(2, "Your name is too short!")
    .required("How can we be friends without knowing your name?"),
});

function validateWithYup(yupSchema) {
  return (values) =>
    yupSchema.validate(values, { abortEarly: false }).then(
      () => {},
      (error) => {
        if (error.inner.length) {
          throw error.inner.reduce(
            (acc, curr) => set(acc, curr.path, curr.message),
            {}
          );
        }
      }
    );
}

function Example() {
  const form = useFormState({
    values: { name: "" },
    onValidate: validateWithYup(schema),
  });
  return (
    <Form {...form}>
      <FormLabel {...form} name="name">
        Name
      </FormLabel>
      <FormInput {...form} name="name" placeholder="John Doe" />
      <FormMessage {...form} name="name" />
      <FormSubmitButton {...form}>Submit</FormSubmitButton>
    </Form>
  );
}
```

### Abstracting

You may find cumbersome having to pass `{...form}` to every component. Also, repeating `FormLabel`, `FormInput` and `FormMessage` for every form field may sound overly verbose to you.

[Reakit is a low level library](/docs/basic-concepts/) designed to give you explicit building blocks so you can create anything you want, and design any API you wish. It's easy to go from explicit to implicit.

<!-- eslint-disable no-alert -->

```jsx
import React from "react";
import {
  unstable_useFormState as useFormState,
  unstable_Form as BaseForm,
  unstable_FormLabel as FormLabel,
  unstable_FormInput as FormInput,
  unstable_FormMessage as FormMessage,
  unstable_FormSubmitButton as FormSubmitButton,
} from "reakit/Form";

const FormContext = React.createContext();

function Form({ initialValues, onValidate, onSubmit, ...props }) {
  const form = useFormState({ values: initialValues, onValidate, onSubmit });
  const value = React.useMemo(() => form, Object.values(form));
  return (
    <FormContext.Provider value={value}>
      <BaseForm {...form} {...props} />
    </FormContext.Provider>
  );
}

function Field({ name, label, ...props }) {
  const form = React.useContext(FormContext);
  return (
    <>
      <FormLabel {...form} name={name} label={label} />
      <FormInput {...form} {...props} name={name} />
      <FormMessage {...form} name={name} />
    </>
  );
}

function SubmitButton(props) {
  const form = React.useContext(FormContext);
  return <FormSubmitButton {...form} {...props} />;
}

function Example() {
  const onValidate = (values) => {
    if (!values.name) {
      const errors = {
        name: "How can we be friends without knowing your name?",
      };
      throw errors;
    }
  };
  const onSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
  };
  return (
    <Form
      initialValues={{ name: "" }}
      onValidate={onValidate}
      onSubmit={onSubmit}
    >
      <Field label="Name" name="name" placeholder="John Doe" />
      <SubmitButton>Submit</SubmitButton>
    </Form>
  );
}
```

## Accessibility

- `Form` has role `form`.
- Clicking on `FormSubmitButton` on a form with errors will move focus to the first failed input.
- Clicking on `FormPushButton` will move focus to the first input in the added row.
- Clicking on `FormRemoveButton` will move focus to the first input in the next row. If there's no next row, it will move focus to the first input in the previous row. If there's no previous row, it will move focus to `FormPushButton`.

Learn more in [Accessibility](/docs/accessibility/).

## Composition

- `Form` uses [Role](/docs/role/).
- `FormCheckbox` uses [Checkbox](/docs/checkbox/).
- `FormGroup` uses [Group](/docs/group/).
- `FormInput` uses [Input](/docs/input/).
- `FormLabel` uses [Role](/docs/role/).
- `FormMessage` uses [Role](/docs/role/).
- `FormPushButton` uses [Button](/docs/button/).
- `FormRadio` uses [Radio](/docs/radio/).
- `FormRadioGroup` uses `FormGroup`.
- `FormRemoveButton` uses [Button](/docs/button/).
- `FormSubmitButton` uses [Button](/docs/button/).

Learn more in [Composition](/docs/composition/#props-hooks).

## Props

<!-- Automatically generated -->

### `useFormState`

- **`baseId`**
  <code>string</code>

  ID that will serve as a base for all the items IDs.

- **`values`**
  <code>V</code>

  Form values.

- **`validateOnBlur`**
  <code>boolean | undefined</code>

  Whether the form should trigger `onValidate` on blur.

- **`validateOnChange`**
  <code>boolean | undefined</code>

  Whether the form should trigger `onValidate` on change.

- **`resetOnSubmitSucceed`**
  <code>boolean | undefined</code>

  Whether the form should reset when it has been successfully submitted.

- **`resetOnUnmount`**
  <code>boolean | undefined</code>

  Whether the form should reset when the component (which called
`useFormState`) has been unmounted.

- **`onValidate`**
  <code>((values: V) =&#62; ValidateReturn&#60;V&#62;) | undefined</code>

  A function that receives `form.values` and return or throw messages.
If it returns, messages will be interpreted as successful messages.
If it throws, they will be interpreted as errors.
It can also return a promise for asynchronous validation.

- **`onSubmit`**
  <code>((values: V) =&#62; ValidateReturn&#60;V&#62;) | undefined</code>

  A function that receives `form.values` and performs form submission.
If it's triggered by `form.submit()`, `onValidate` will be called before.
If `onValidate` throws, `onSubmit` will not be called.
`onSubmit` can also return promises, messages and throw error messages
just like `onValidate`. The only difference is that this validation will
only occur on submit.

### `Form`

<details><summary>1 state props</summary>

> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`submit`**
  <code>() =&#62; void</code>

  Triggers form submission (calling `onValidate` and `onSubmit` underneath).

</details>

### `FormCheckbox`

- **`disabled`**
  <code>boolean | undefined</code>

  Same as the HTML attribute.

- **`focusable`**
  <code>boolean | undefined</code>

  When an element is `disabled`, it may still be `focusable`. It works
similarly to `readOnly` on form elements. In this case, only
`aria-disabled` will be set.

- **`checked`**
  <code>boolean | undefined</code>

  Checkbox's checked state. If present, it's used instead of `state`.

- **`name`**
  <code>P</code>

  Checkbox's name as in form values.

- **`value`**
  <code>ArrayValue&#60;DeepPathValue&#60;V, P&#62;&#62; | undefined</code>

  Checkbox's value is going to be used when multiple checkboxes share the
same state. Checking a checkbox with value will add it to the state
array.

<details><summary>6 state props</summary>

> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`baseId`**
  <code>string</code>

  ID that will serve as a base for all the items IDs.

- **`values`**
  <code>V</code>

  Form values.

- **`update`**
  <code>Update&#60;V&#62;</code>

  Updates a form value.

- **`blur`**
  <code>&#60;P extends DeepPath&#60;V, P&#62;&#62;(name: P) =&#62; void</code>

  Sets field's touched state to `true`.

- **`touched`**
  <code title="{ [P in keyof DeepMap&#60;V, boolean&#62;]?: (DeepMap&#60;V, boolean&#62;[P] extends (infer U)[] ? DeepPartial&#60;U&#62;[] : DeepMap&#60;V, boolean&#62;[P] extends readonly (infer U)[] ? readonly DeepPartial&#60;U&#62;[] : DeepPartial&#60;...&#62;) | undefined; }">{ [P in keyof DeepMap&#60;V, boolean&#62;]?: (DeepMap&#60;V...</code>

  An object with the same shape as `form.values` with `boolean` values.
This keeps the touched state of each field. That is, whether a field has
been blurred.

- **`errors`**
  <code title="{ [P in keyof DeepMap&#60;V, string | void | null&#62;]?: (DeepMap&#60;V, string | void | null&#62;[P] extends (infer U)[] ? DeepPartial&#60;U&#62;[] : DeepMap&#60;V, string | void | null&#62;[P] extends readonly (infer U)[] ? readonly DeepPartial&#60;...&#62;[] : DeepPartial&#60;...&#62;) | undefined; }">{ [P in keyof DeepMap&#60;V, string | void | null&#62;]...</code>

  An object with the same shape as `form.values` with string error messages.
This stores the error messages throwed by `onValidate` and `onSubmit`.

</details>

### `FormGroup`

- **`name`**
  <code>P</code>

  FormGroup's name as in form values.

<details><summary>3 state props</summary>

> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`baseId`**
  <code>string</code>

  ID that will serve as a base for all the items IDs.

- **`touched`**
  <code title="{ [P in keyof DeepMap&#60;V, boolean&#62;]?: (DeepMap&#60;V, boolean&#62;[P] extends (infer U)[] ? DeepPartial&#60;U&#62;[] : DeepMap&#60;V, boolean&#62;[P] extends readonly (infer U)[] ? readonly DeepPartial&#60;U&#62;[] : DeepPartial&#60;...&#62;) | undefined; }">{ [P in keyof DeepMap&#60;V, boolean&#62;]?: (DeepMap&#60;V...</code>

  An object with the same shape as `form.values` with `boolean` values.
This keeps the touched state of each field. That is, whether a field has
been blurred.

- **`errors`**
  <code title="{ [P in keyof DeepMap&#60;V, string | void | null&#62;]?: (DeepMap&#60;V, string | void | null&#62;[P] extends (infer U)[] ? DeepPartial&#60;U&#62;[] : DeepMap&#60;V, string | void | null&#62;[P] extends readonly (infer U)[] ? readonly DeepPartial&#60;...&#62;[] : DeepPartial&#60;...&#62;) | undefined; }">{ [P in keyof DeepMap&#60;V, string | void | null&#62;]...</code>

  An object with the same shape as `form.values` with string error messages.
This stores the error messages throwed by `onValidate` and `onSubmit`.

</details>

### `FormInput`

- **`disabled`**
  <code>boolean | undefined</code>

  Same as the HTML attribute.

- **`focusable`**
  <code>boolean | undefined</code>

  When an element is `disabled`, it may still be `focusable`. It works
similarly to `readOnly` on form elements. In this case, only
`aria-disabled` will be set.

- **`name`**
  <code>P</code>

  FormInput's name as in form values.

<details><summary>6 state props</summary>

> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`baseId`**
  <code>string</code>

  ID that will serve as a base for all the items IDs.

- **`values`**
  <code>V</code>

  Form values.

- **`update`**
  <code>Update&#60;V&#62;</code>

  Updates a form value.

- **`blur`**
  <code>&#60;P extends DeepPath&#60;V, P&#62;&#62;(name: P) =&#62; void</code>

  Sets field's touched state to `true`.

- **`touched`**
  <code title="{ [P in keyof DeepMap&#60;V, boolean&#62;]?: (DeepMap&#60;V, boolean&#62;[P] extends (infer U)[] ? DeepPartial&#60;U&#62;[] : DeepMap&#60;V, boolean&#62;[P] extends readonly (infer U)[] ? readonly DeepPartial&#60;U&#62;[] : DeepPartial&#60;...&#62;) | undefined; }">{ [P in keyof DeepMap&#60;V, boolean&#62;]?: (DeepMap&#60;V...</code>

  An object with the same shape as `form.values` with `boolean` values.
This keeps the touched state of each field. That is, whether a field has
been blurred.

- **`errors`**
  <code title="{ [P in keyof DeepMap&#60;V, string | void | null&#62;]?: (DeepMap&#60;V, string | void | null&#62;[P] extends (infer U)[] ? DeepPartial&#60;U&#62;[] : DeepMap&#60;V, string | void | null&#62;[P] extends readonly (infer U)[] ? readonly DeepPartial&#60;...&#62;[] : DeepPartial&#60;...&#62;) | undefined; }">{ [P in keyof DeepMap&#60;V, string | void | null&#62;]...</code>

  An object with the same shape as `form.values` with string error messages.
This stores the error messages throwed by `onValidate` and `onSubmit`.

</details>

### `FormLabel`

- **`name`**
  <code>P</code>

  FormInput's name as in form values.

- **`label`**
  <code>any</code>

  Label can be passed as the `label` prop or `children`.

<details><summary>2 state props</summary>

> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`baseId`**
  <code>string</code>

  ID that will serve as a base for all the items IDs.

- **`values`**
  <code>V</code>

  Form values.

</details>

### `FormMessage`

- **`name`**
  <code>P</code>

  FormInput's name as in form values.

<details><summary>4 state props</summary>

> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`baseId`**
  <code>string</code>

  ID that will serve as a base for all the items IDs.

- **`touched`**
  <code title="{ [P in keyof DeepMap&#60;V, boolean&#62;]?: (DeepMap&#60;V, boolean&#62;[P] extends (infer U)[] ? DeepPartial&#60;U&#62;[] : DeepMap&#60;V, boolean&#62;[P] extends readonly (infer U)[] ? readonly DeepPartial&#60;U&#62;[] : DeepPartial&#60;...&#62;) | undefined; }">{ [P in keyof DeepMap&#60;V, boolean&#62;]?: (DeepMap&#60;V...</code>

  An object with the same shape as `form.values` with `boolean` values.
This keeps the touched state of each field. That is, whether a field has
been blurred.

- **`errors`**
  <code title="{ [P in keyof DeepMap&#60;V, string | void | null&#62;]?: (DeepMap&#60;V, string | void | null&#62;[P] extends (infer U)[] ? DeepPartial&#60;U&#62;[] : DeepMap&#60;V, string | void | null&#62;[P] extends readonly (infer U)[] ? readonly DeepPartial&#60;...&#62;[] : DeepPartial&#60;...&#62;) | undefined; }">{ [P in keyof DeepMap&#60;V, string | void | null&#62;]...</code>

  An object with the same shape as `form.values` with string error messages.
This stores the error messages throwed by `onValidate` and `onSubmit`.

- **`messages`**
  <code title="{ [P in keyof DeepMap&#60;V, string | void | null&#62;]?: (DeepMap&#60;V, string | void | null&#62;[P] extends (infer U)[] ? DeepPartial&#60;U&#62;[] : DeepMap&#60;V, string | void | null&#62;[P] extends readonly (infer U)[] ? readonly DeepPartial&#60;...&#62;[] : DeepPartial&#60;...&#62;) | undefined; }">{ [P in keyof DeepMap&#60;V, string | void | null&#62;]...</code>

  An object with the same shape as `form.values` with string messages.
This stores the messages returned by `onValidate` and `onSubmit`.

</details>

### `FormPushButton`

- **`disabled`**
  <code>boolean | undefined</code>

  Same as the HTML attribute.

- **`focusable`**
  <code>boolean | undefined</code>

  When an element is `disabled`, it may still be `focusable`. It works
similarly to `readOnly` on form elements. In this case, only
`aria-disabled` will be set.

- **`name`**
  <code>P</code>

  FormInput's name as in form values. This should point to array value.

- **`value`**
  <code title="DeepPathValue&#60;V, P&#62; extends (infer U)[] ? U : never">DeepPathValue&#60;V, P&#62; extends (infer U)[] ? U : n...</code>

  The value that is going to be pushed to `form.values[name]`.

<details><summary>3 state props</summary>

> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`baseId`**
  <code>string</code>

  ID that will serve as a base for all the items IDs.

- **`values`**
  <code>V</code>

  Form values.

- **`push`**
  <code title="&#60;P extends DeepPath&#60;V, P&#62;&#62;(name: P, value?: ArrayValue&#60;DeepPathValue&#60;V, P&#62;&#62; | undefined) =&#62; void">&#60;P extends DeepPath&#60;V, P&#62;&#62;(name: P, value?: Arr...</code>

  Pushes a new item into `form.values[name]`, which should be an array.

</details>

### `FormRadio`

- **`name`**
  <code>P</code>

  FormRadio's name as in form values.

- **`value`**
  <code title="P extends DeepPathArray&#60;V, P&#62; ? DeepPathArrayValue&#60;V, P&#62; : P extends keyof V ? V[P] : any">P extends DeepPathArray&#60;V, P&#62; ? DeepPathArrayVa...</code>

  FormRadio's value.

<details><summary>3 state props</summary>

> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`values`**
  <code>V</code>

  Form values.

- **`update`**
  <code>Update&#60;V&#62;</code>

  Updates a form value.

- **`blur`**
  <code>&#60;P extends DeepPath&#60;V, P&#62;&#62;(name: P) =&#62; void</code>

  Sets field's touched state to `true`.

</details>

### `FormRadioGroup`

- **`name`**
  <code>P</code>

  FormGroup's name as in form values.

<details><summary>3 state props</summary>

> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`baseId`**
  <code>string</code>

  ID that will serve as a base for all the items IDs.

- **`touched`**
  <code title="{ [P in keyof DeepMap&#60;V, boolean&#62;]?: (DeepMap&#60;V, boolean&#62;[P] extends (infer U)[] ? DeepPartial&#60;U&#62;[] : DeepMap&#60;V, boolean&#62;[P] extends readonly (infer U)[] ? readonly DeepPartial&#60;U&#62;[] : DeepPartial&#60;...&#62;) | undefined; }">{ [P in keyof DeepMap&#60;V, boolean&#62;]?: (DeepMap&#60;V...</code>

  An object with the same shape as `form.values` with `boolean` values.
This keeps the touched state of each field. That is, whether a field has
been blurred.

- **`errors`**
  <code title="{ [P in keyof DeepMap&#60;V, string | void | null&#62;]?: (DeepMap&#60;V, string | void | null&#62;[P] extends (infer U)[] ? DeepPartial&#60;U&#62;[] : DeepMap&#60;V, string | void | null&#62;[P] extends readonly (infer U)[] ? readonly DeepPartial&#60;...&#62;[] : DeepPartial&#60;...&#62;) | undefined; }">{ [P in keyof DeepMap&#60;V, string | void | null&#62;]...</code>

  An object with the same shape as `form.values` with string error messages.
This stores the error messages throwed by `onValidate` and `onSubmit`.

</details>

### `FormRemoveButton`

- **`disabled`**
  <code>boolean | undefined</code>

  Same as the HTML attribute.

- **`focusable`**
  <code>boolean | undefined</code>

  When an element is `disabled`, it may still be `focusable`. It works
similarly to `readOnly` on form elements. In this case, only
`aria-disabled` will be set.

- **`name`**
  <code>P</code>

  FormInput's name as in form values. This should point to array value.

- **`index`**
  <code>number</code>

  The index in `form.values[name]` that will be removed.

<details><summary>3 state props</summary>

> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`baseId`**
  <code>string</code>

  ID that will serve as a base for all the items IDs.

- **`values`**
  <code>V</code>

  Form values.

- **`remove`**
  <code title="&#60;P extends DeepPath&#60;V, P&#62;&#62;(name: P, index: number) =&#62; void">&#60;P extends DeepPath&#60;V, P&#62;&#62;(name: P, index: numb...</code>

  Removes `form.values[name][index]`.

</details>

### `FormSubmitButton`

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

- **`submitting`**
  <code>boolean</code>

  Whether form is submitting or not.

- **`baseId`**
  <code>string</code>

  ID that will serve as a base for all the items IDs.

- **`submit`**
  <code>() =&#62; void</code>

  Triggers form submission (calling `onValidate` and `onSubmit` underneath).

</details>
