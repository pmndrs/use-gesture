import * as React from "react";
import {
  render,
  fireEvent,
  type,
  wait,
  blur,
  click,
  press,
  focus,
} from "reakit-test-utils";
import {
  unstable_Form as Form,
  unstable_FormCheckbox as FormCheckbox,
  unstable_FormGroup as FormGroup,
  unstable_FormInput as FormInput,
  unstable_FormLabel as FormLabel,
  unstable_FormMessage as FormMessage,
  unstable_FormRadio as FormRadio,
  unstable_FormSubmitButton as FormSubmitButton,
  unstable_FormRemoveButton as FormRemoveButton,
  unstable_FormPushButton as FormPushButton,
  unstable_useFormState as useFormState,
  unstable_FormRadioGroup as FormRadioGroup,
  unstable_useFormInput as useFormInput,
  unstable_useFormPushButton as useFormPushButton,
  unstable_useFormRadio as useFormRadio,
  unstable_useFormRadioGroup as useFormRadioGroup,
  unstable_useFormRemoveButton as useFormRemoveButton,
  unstable_FormStateReturn as FormStateReturn,
} from "..";

test("validate on change", async () => {
  const onValidate = jest.fn();
  const Test = () => {
    const form = useFormState({ onValidate });
    return (
      <Form {...form}>
        <FormLabel {...form} name="input" label="input" />
        <FormInput {...form} name="input" />
      </Form>
    );
  };
  const { getByLabelText } = render(<Test />);
  const input = getByLabelText("input");
  expect(onValidate).not.toHaveBeenCalled();
  type("a", input);
  await wait(() => expect(onValidate).toHaveBeenCalledWith({ input: "a" }));
});

test("don't validate on change if validateOnChange is false", async () => {
  const onValidate = jest.fn();
  const Test = () => {
    const form = useFormState({ onValidate, validateOnChange: false });
    return (
      <Form {...form}>
        <FormLabel {...form} name="input" label="input" />
        <FormInput {...form} name="input" />
      </Form>
    );
  };
  const { getByLabelText } = render(<Test />);
  const input = getByLabelText("input");
  expect(onValidate).not.toHaveBeenCalled();
  type("a", input);
  await wait(expect(onValidate).not.toHaveBeenCalled);
});

test("validate on blur", async () => {
  const onValidate = jest.fn();
  const Test = () => {
    const form = useFormState({ onValidate });
    return (
      <Form {...form}>
        <FormLabel {...form} name="input" label="input" />
        <FormInput {...form} name="input" />
      </Form>
    );
  };
  const { getByLabelText } = render(<Test />);
  const input = getByLabelText("input");
  expect(onValidate).not.toHaveBeenCalled();
  focus(input);
  blur();
  await wait(() => expect(onValidate).toHaveBeenCalledWith({}));
});

test("don't validate on blur if validateOnBlur is false", async () => {
  const onValidate = jest.fn();
  const Test = () => {
    const form = useFormState({ onValidate, validateOnBlur: false });
    return (
      <Form {...form}>
        <FormLabel {...form} name="input" label="input" />
        <FormInput {...form} name="input" />
      </Form>
    );
  };
  const { getByLabelText } = render(<Test />);
  const input = getByLabelText("input");
  expect(onValidate).not.toHaveBeenCalled();
  focus(input);
  blur();
  await wait(expect(onValidate).not.toHaveBeenCalled);
});

test("display validation error", async () => {
  const Test = () => {
    const form = useFormState({
      values: {
        input: "",
      },
      onValidate: (values) => {
        if (!values.input) {
          const error = { input: "required" };
          return Promise.reject(error);
        }
        return undefined;
      },
    });
    return (
      <Form {...form}>
        <FormLabel {...form} name="input" label="input" />
        <FormInput {...form} name="input" />
        <FormMessage {...form} name="input" data-testid="error" />
      </Form>
    );
  };
  const { getByLabelText, getByTestId } = render(<Test />);
  const input = getByLabelText("input");
  const error = getByTestId("error");
  expect(error).toBeEmptyDOMElement();
  focus(input);
  blur();
  await wait(() => expect(error).toHaveTextContent("required"));
});

test("display validation message", async () => {
  const Test = () => {
    const form = useFormState({
      values: {
        input: "",
      },
      onValidate: (values) => {
        if (values.input) {
          return { input: "nice" };
        }
        return {};
      },
    });
    return (
      <Form {...form}>
        <FormLabel {...form} name="input" label="input" />
        <FormInput {...form} name="input" />
        <FormMessage {...form} name="input" data-testid="message" />
      </Form>
    );
  };
  const { getByLabelText, getByTestId } = render(<Test />);
  const input = getByLabelText("input");
  const message = getByTestId("message");
  expect(message).toBeEmptyDOMElement();
  type("a", input);
  expect(message).toBeEmptyDOMElement();
  focus(input);
  blur();
  await wait(() => expect(message).toHaveTextContent("nice"));
});

test("display submission error", async () => {
  const Test = () => {
    const form = useFormState({
      values: {
        a: {
          b: {
            c: ["d", "e", "f"],
          },
        },
      },
      onSubmit: (values) => {
        if (values.a.b.c[1] === "e") {
          const error = {
            a: {
              b: {
                c: [null, "error"],
              },
            },
          };
          throw error;
        }
      },
    });
    return (
      <Form {...form}>
        <FormLabel {...form} name={["a", "b", "c", 1]} label="input" />
        <FormInput {...form} name={["a", "b", "c", 1]} />
        <FormMessage {...form} name={["a", "b", "c", 1]} data-testid="error" />
      </Form>
    );
  };
  const { getByRole, getByTestId } = render(<Test />);
  const form = getByRole("form");
  const error = getByTestId("error");
  expect(error).toBeEmptyDOMElement();
  fireEvent.submit(form);
  await wait(() => expect(error).toHaveTextContent("error"));
});

test("display submission message", async () => {
  const Test = () => {
    const form = useFormState({
      values: {
        a: {
          b: {
            c: ["d", "e", "f"],
          },
        },
      },
      onSubmit: (values) => {
        if (values.a.b.c[1] === "e") {
          return {
            a: {
              b: {
                c: [null, "nice"],
              },
            },
          };
        }
        return {};
      },
    });
    return (
      <Form {...form}>
        <FormLabel {...form} name={["a", "b", "c", 1]} label="input" />
        <FormInput {...form} name={["a", "b", "c", 1]} />
        <FormMessage
          {...form}
          name={["a", "b", "c", 1]}
          data-testid="message"
        />
      </Form>
    );
  };
  const { getByRole, getByTestId } = render(<Test />);
  const form = getByRole("form");
  const message = getByTestId("message");
  expect(message).toBeEmptyDOMElement();
  fireEvent.submit(form);
  await wait(() => expect(message).toHaveTextContent("nice"));
});

test("display validation message on submit", async () => {
  const Test = () => {
    const form = useFormState({
      values: {
        a: {
          b: {
            c: ["d", "e", "f"],
          },
        },
      },
      onValidate: (values) => {
        if (values.a.b.c[1] === "e") {
          return {
            a: {
              b: {
                c: [null, "nice"],
              },
            },
          };
        }
        return {};
      },
    });
    return (
      <Form {...form}>
        <FormLabel {...form} name={["a", "b", "c", 1]} label="input" />
        <FormInput {...form} name={["a", "b", "c", 1]} />
        <FormMessage
          {...form}
          name={["a", "b", "c", 1]}
          data-testid="message"
        />
      </Form>
    );
  };
  const { getByRole, getByTestId } = render(<Test />);
  const form = getByRole("form");
  const message = getByTestId("message");
  expect(message).toBeEmptyDOMElement();
  fireEvent.submit(form);
  await wait(() => expect(message).toHaveTextContent("nice"));
});

test("display validation error on submit", async () => {
  const Test = () => {
    const form = useFormState({
      values: {
        a: {
          b: {
            c: ["d", "e", "f"],
          },
        },
      },
      onValidate: (values) => {
        if (values.a.b.c[1] === "e") {
          const error = {
            a: {
              b: {
                c: [null, "error"],
              },
            },
          };
          throw error;
        }
      },
    });
    return (
      <Form {...form}>
        <FormLabel {...form} name={["a", "b", "c", 1]} label="input" />
        <FormInput {...form} name={["a", "b", "c", 1]} />
        <FormMessage {...form} name={["a", "b", "c", 1]} data-testid="error" />
      </Form>
    );
  };
  const { getByRole, getByTestId } = render(<Test />);
  const form = getByRole("form");
  const error = getByTestId("error");
  expect(error).toBeEmptyDOMElement();
  fireEvent.submit(form);
  await wait(() => expect(error).toHaveTextContent("error"));
});

test("display group error", async () => {
  const Test = () => {
    const form = useFormState({
      values: {
        input: ["a"] as Array<"a" | "b" | "c">,
      },
      onValidate: (values) => {
        if (values.input.length <= 1) {
          const error = { input: "error" };
          throw error;
        }
      },
    });
    return (
      <Form {...form}>
        <FormGroup {...form} name="input">
          <label>
            <FormCheckbox {...form} name="input" value="a" />a
          </label>
          <label>
            <FormCheckbox {...form} name="input" value="b" />b
          </label>
          <label>
            <FormCheckbox {...form} name="input" value="c" />c
          </label>
        </FormGroup>
        <FormMessage {...form} name="input" data-testid="error" />
      </Form>
    );
  };
  const { getByRole, getByTestId, getByLabelText } = render(<Test />);
  const form = getByRole("form");
  const error = getByTestId("error");
  const a = getByLabelText("a");
  const b = getByLabelText("b");
  expect(error).toBeEmptyDOMElement();
  fireEvent.submit(form);
  await wait(() => expect(error).toHaveTextContent("error"));
  click(b);
  await wait(expect(error).toBeEmptyDOMElement);
  click(a);
  await wait(() => expect(error).toHaveTextContent("error"));
});

test("focus the first invalid input on failed submit", async () => {
  const Test = () => {
    const form = useFormState({
      values: {
        input1: "",
        input2: "",
        input3: "",
      },
      onValidate: (values) => {
        if (!values.input2) {
          const error = { input2: "error" };
          throw error;
        }
      },
    });
    return (
      <Form {...form}>
        <FormLabel {...form} name="input1" label="input1" />
        <FormInput {...form} name="input1" />
        <FormLabel {...form} name="input2" label="input2" />
        <FormInput {...form} name="input2" />
        <FormLabel {...form} name="input3" label="input3" />
        <FormInput {...form} name="input3" />
        <FormSubmitButton {...form} data-testid="submit" />
      </Form>
    );
  };
  const { getByLabelText, getByTestId } = render(<Test />);
  const input2 = getByLabelText("input2");
  const submit = getByTestId("submit");
  expect(input2).not.toHaveFocus();
  click(submit);
  await wait(expect(input2).toHaveFocus);
});

test("focus the first invalid fieldset on failed submit", async () => {
  const Test = () => {
    const form = useFormState({
      values: {
        input1: "",
        choice1: "",
        choice2: "",
      },
      onValidate: () => {
        const error = { choice1: "error", choice2: "error" };
        throw error;
      },
    });
    return (
      <Form {...form}>
        <FormLabel {...form} name="input1" label="input1" />
        <FormInput {...form} name="input1" />
        <FormRadioGroup {...form} name="choice1">
          <FormLabel {...form} as="legend" name="choice1" label="choice1" />
          <label>
            <FormRadio {...form} name="choice1" value="a" />a
          </label>
          <label>
            <FormRadio {...form} name="choice1" value="b" />b
          </label>
        </FormRadioGroup>
        <FormLabel {...form} name="choice2" label="choice2" />
        <FormInput {...form} name="choice2" />
        <FormSubmitButton {...form} data-testid="submit" />
      </Form>
    );
  };
  const { getByLabelText, getByTestId } = render(<Test />);
  const choice1 = getByLabelText("choice1");
  const submit = getByTestId("submit");
  expect(choice1).not.toHaveFocus();
  click(submit);
  await wait(expect(choice1).toHaveFocus);
});

test("arrow keys control radio buttons", async () => {
  const Test = () => {
    const form = useFormState({
      values: {
        input: "a",
      },
    });
    return (
      <Form {...form}>
        <FormRadioGroup {...form} name="input">
          <label>
            <FormRadio {...form} name="input" value="a" />a
          </label>
          <label>
            <FormRadio {...form} name="input" value="b" />b
          </label>
          <label>
            <FormRadio {...form} name="input" value="c" />c
          </label>
        </FormRadioGroup>
      </Form>
    );
  };
  const { getByLabelText } = render(<Test />);
  const a = getByLabelText("a") as HTMLInputElement;
  const b = getByLabelText("b") as HTMLInputElement;
  const c = getByLabelText("c") as HTMLInputElement;

  focus(b);
  expect(b).toHaveFocus();
  expect(b.checked).toBe(false);

  press.ArrowDown();
  expect(c).toHaveFocus();
  expect(c.checked).toBe(true);

  press.ArrowDown();
  expect(a).toHaveFocus();
  expect(a.checked).toBe(true);

  press.ArrowUp();
  expect(c).toHaveFocus();
  expect(c.checked).toBe(true);

  press.ArrowLeft();
  expect(b).toHaveFocus();
  expect(b.checked).toBe(true);

  press.ArrowRight();
  expect(c).toHaveFocus();
  expect(c.checked).toBe(true);
});

test("push/remove button adds/removes entry and moves focus", async () => {
  const Test = () => {
    const form = useFormState({
      baseId: "form",
      values: {
        people: [] as Array<{ name: string; email: string }>,
      },
    });
    return (
      <Form {...form}>
        {form.values.people.map((_, i) => (
          <React.Fragment key={i}>
            <FormInput
              {...form}
              placeholder={`name${i}`}
              name={["people", i, "name"]}
            />
            <FormInput
              {...form}
              placeholder={`email${i}`}
              name={["people", i, "email"]}
            />
            <FormRemoveButton
              {...form}
              data-testid={`remove${i}`}
              name="people"
              index={i}
            />
          </React.Fragment>
        ))}
        <FormPushButton
          {...form}
          data-testid="push"
          name="people"
          value={{ name: "", email: "" }}
        />
      </Form>
    );
  };
  const { getByTestId, getByPlaceholderText, container } = render(<Test />);
  const push = getByTestId("push");

  expect(container).toMatchInlineSnapshot(`
    <div>
      <form
        novalidate=""
        role="form"
      >
        <button
          data-testid="push"
          id="form-people-push"
          type="button"
        />
      </form>
    </div>
  `);

  click(push);

  expect(container).toMatchInlineSnapshot(`
    <div>
      <form
        novalidate=""
        role="form"
      >
        <input
          aria-describedby="form-people-0-name-message"
          aria-invalid="false"
          aria-labelledby="form-people-0-name-label"
          id="form-people-0-name"
          name="people.0.name"
          placeholder="name0"
          value=""
        />
        <input
          aria-describedby="form-people-0-email-message"
          aria-invalid="false"
          aria-labelledby="form-people-0-email-label"
          id="form-people-0-email"
          name="people.0.email"
          placeholder="email0"
          value=""
        />
        <button
          data-testid="remove0"
          type="button"
        />
        <button
          data-testid="push"
          id="form-people-push"
          type="button"
        />
      </form>
    </div>
  `);

  await wait(expect(getByPlaceholderText("name0")).toHaveFocus);

  click(push);
  await wait(expect(getByPlaceholderText("name1")).toHaveFocus);

  click(push);
  await wait(expect(getByPlaceholderText("name2")).toHaveFocus);

  const remove0 = getByTestId("remove0");
  const remove1 = getByTestId("remove1");
  const remove2 = getByTestId("remove2");

  click(remove0);
  await wait(expect(getByPlaceholderText("name1")).toHaveFocus);

  click(remove2);
  await wait(expect(getByPlaceholderText("name1")).toHaveFocus);

  click(remove1);
  await wait(expect(push).toHaveFocus);
});

test("useFormInput passing name as htmlProps", async () => {
  const onValidate = jest.fn();
  const Test = () => {
    const form = useFormState({ onValidate });
    // @ts-ignore
    const input = useFormInput(form, { name: "input" });
    return (
      <Form {...form}>
        <FormLabel {...form} name="input" label="input" />
        <input {...input} />
      </Form>
    );
  };
  const { getByLabelText } = render(<Test />);
  const input = getByLabelText("input");
  expect(onValidate).not.toHaveBeenCalled();
  type("a", input);
  await wait(() => expect(onValidate).toHaveBeenCalledWith({ input: "a" }));
});

test("useFormPushButton and useFormRemoveButton passing name and value as htmlProps", async () => {
  type Values = {
    people: Array<{ name: string; email: string }>;
  };
  const Fragment = ({
    i,
    ...props
  }: FormStateReturn<Values> & { i: number }) => {
    const removeButton = useFormRemoveButton(
      // @ts-ignore
      { index: i, ...props },
      { name: "people", "data-testid": `remove${i}` }
    );

    return (
      <>
        <FormInput
          {...props}
          placeholder={`name${i}`}
          name={["people", i, "name"]}
        />
        <FormInput
          {...props}
          placeholder={`email${i}`}
          name={["people", i, "email"]}
        />
        <button {...removeButton} />
      </>
    );
  };
  const Test = () => {
    const form = useFormState<Values>({
      baseId: "form",
      values: {
        people: [],
      },
    });
    // @ts-ignore
    const pushButton = useFormPushButton(form, {
      name: "people",
      value: { name: "", email: "" },
      "data-testid": "push",
    });
    return (
      <Form {...form}>
        {form.values.people.map((_, i) => (
          <Fragment {...form} key={i} i={i} />
        ))}
        <button {...pushButton} />
      </Form>
    );
  };
  const { getByTestId, getByPlaceholderText, container } = render(<Test />);
  const push = getByTestId("push");

  expect(container).toMatchInlineSnapshot(`
    <div>
      <form
        novalidate=""
        role="form"
      >
        <button
          data-testid="push"
          id="form-people-push"
          name="people"
          type="button"
          value="[object Object]"
        />
      </form>
    </div>
  `);

  click(push);

  expect(container).toMatchInlineSnapshot(`
    <div>
      <form
        novalidate=""
        role="form"
      >
        <input
          aria-describedby="form-people-0-name-message"
          aria-invalid="false"
          aria-labelledby="form-people-0-name-label"
          id="form-people-0-name"
          name="people.0.name"
          placeholder="name0"
          value=""
        />
        <input
          aria-describedby="form-people-0-email-message"
          aria-invalid="false"
          aria-labelledby="form-people-0-email-label"
          id="form-people-0-email"
          name="people.0.email"
          placeholder="email0"
          value=""
        />
        <button
          data-testid="remove0"
          name="people"
          type="button"
        />
        <button
          data-testid="push"
          id="form-people-push"
          name="people"
          type="button"
          value="[object Object]"
        />
      </form>
    </div>
  `);

  await wait(expect(getByPlaceholderText("name0")).toHaveFocus);

  click(push);
  await wait(expect(getByPlaceholderText("name1")).toHaveFocus);

  click(push);
  await wait(expect(getByPlaceholderText("name2")).toHaveFocus);

  const remove0 = getByTestId("remove0");
  const remove1 = getByTestId("remove1");
  const remove2 = getByTestId("remove2");

  click(remove0);
  await wait(expect(getByPlaceholderText("name1")).toHaveFocus);

  click(remove2);
  await wait(expect(getByPlaceholderText("name1")).toHaveFocus);

  click(remove1);
  await wait(expect(push).toHaveFocus);
});

test("useFormRadio and useFormRadioGroup passing name and value as htmlProps", async () => {
  type Values = {
    input: string;
  };
  const CustomFormRadio = ({
    value,
    ...props
  }: FormStateReturn<Values> & { value: string }) => {
    // @ts-ignore
    const formRadio = useFormRadio(props, { name: "input", value });
    return (
      <label>
        <input {...formRadio} />
        {value}
      </label>
    );
  };
  const Test = () => {
    const form = useFormState<Values>({
      baseId: "form",
      values: {
        input: "a",
      },
    });
    // @ts-ignore
    const { wrapElement, ...radioGroup } = useFormRadioGroup(form, {
      name: "input",
    });
    const children = (
      <fieldset {...radioGroup}>
        <CustomFormRadio {...form} value="a" />
        <CustomFormRadio {...form} value="b" />
        <CustomFormRadio {...form} value="c" />
      </fieldset>
    );
    return (
      <Form {...form}>{wrapElement ? wrapElement(children) : children}</Form>
    );
  };
  const { container } = render(<Test />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <form
        novalidate=""
        role="form"
      >
        <fieldset
          aria-describedby="form-input-message"
          aria-invalid="false"
          aria-labelledby="form-input-label"
          id="form-input"
          name="input"
          role="radiogroup"
          tabindex="-1"
        >
          <label>
            <input
              aria-checked="true"
              checked=""
              id="form-input-1"
              name="input"
              tabindex="0"
              type="radio"
              value="a"
            />
            a
          </label>
          <label>
            <input
              aria-checked="false"
              id="form-input-2"
              name="input"
              tabindex="-1"
              type="radio"
              value="b"
            />
            b
          </label>
          <label>
            <input
              aria-checked="false"
              id="form-input-3"
              name="input"
              tabindex="-1"
              type="radio"
              value="c"
            />
            c
          </label>
        </fieldset>
      </form>
    </div>
  `);
});

test("reset form after removing an item", async () => {
  const Test = () => {
    const form = useFormState({
      baseId: "form",
      values: {
        names: ["a", "b", "c"],
      },
    });
    return (
      <Form {...form}>
        {form.values.names.map((_, i) => (
          <React.Fragment key={i}>
            <FormInput {...form} name={["names", i]} />
            <FormRemoveButton {...form} name="names" index={i}>
              remove{i}
            </FormRemoveButton>
          </React.Fragment>
        ))}
        <button type="button" onClick={form.reset}>
          reset
        </button>
      </Form>
    );
  };
  const { getByText, container } = render(<Test />);
  const remove1 = getByText("remove1");
  const reset = getByText("reset");

  click(remove1);
  click(reset);

  expect(container).toMatchInlineSnapshot(`
    <div>
      <form
        novalidate=""
        role="form"
      >
        <input
          aria-describedby="form-names-0-message"
          aria-invalid="false"
          aria-labelledby="form-names-0-label"
          id="form-names-0"
          name="names.0"
          value="a"
        />
        <button
          type="button"
        >
          remove
          0
        </button>
        <input
          aria-describedby="form-names-1-message"
          aria-invalid="false"
          aria-labelledby="form-names-1-label"
          id="form-names-1"
          name="names.1"
          value="b"
        />
        <button
          type="button"
        >
          remove
          1
        </button>
        <input
          aria-describedby="form-names-2-message"
          aria-invalid="false"
          aria-labelledby="form-names-2-label"
          id="form-names-2"
          name="names.2"
          value="c"
        />
        <button
          type="button"
        >
          remove
          2
        </button>
        <button
          type="button"
        >
          reset
        </button>
      </form>
    </div>
  `);
});
