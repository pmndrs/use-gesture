import * as React from "react";
import { render, click } from "reakit-test-utils";
import { Checkbox, useCheckbox, useCheckboxState } from "..";

test("single checkbox", () => {
  const Test = () => {
    const checkbox = useCheckboxState();
    return (
      <label>
        <Checkbox {...checkbox} />
        checkbox
      </label>
    );
  };
  const { getByLabelText } = render(<Test />);
  const checkbox = getByLabelText("checkbox") as HTMLInputElement;
  expect(checkbox.checked).toBe(false);
  click(checkbox);
  expect(checkbox.checked).toBe(true);
});

test("group checkbox", () => {
  const Test = () => {
    const checkbox = useCheckboxState();
    return (
      <div role="group">
        <Checkbox {...checkbox} as="div" aria-label="apple" value="apple" />
        <label>
          <Checkbox {...checkbox} value="orange" />
          orange
        </label>
        <label>
          <Checkbox {...checkbox} value="watermelon" />
          watermelon
        </label>
      </div>
    );
  };
  const { getByLabelText } = render(<Test />);
  const apple = getByLabelText("apple") as HTMLInputElement;
  const orange = getByLabelText("orange") as HTMLInputElement;
  const watermelon = getByLabelText("watermelon") as HTMLInputElement;
  expect(apple.checked).toBe(false);
  expect(orange.checked).toBe(false);
  expect(watermelon.checked).toBe(false);
  click(orange);
  click(apple);
  expect(apple.checked).toBe(true);
  expect(orange.checked).toBe(true);
  expect(watermelon.checked).toBe(false);
});

test("group checkbox with initial state", () => {
  const Test = () => {
    const checkbox = useCheckboxState({ state: ["orange"] });
    return (
      <div role="group">
        <Checkbox {...checkbox} as="div" aria-label="apple" value="apple" />
        <label>
          <Checkbox {...checkbox} value="orange" />
          orange
        </label>
        <label>
          <Checkbox {...checkbox} value="watermelon" />
          watermelon
        </label>
      </div>
    );
  };
  const { getByLabelText } = render(<Test />);
  const apple = getByLabelText("apple") as HTMLInputElement;
  const orange = getByLabelText("orange") as HTMLInputElement;
  const watermelon = getByLabelText("watermelon") as HTMLInputElement;
  expect(apple.checked).toBe(false);
  expect(orange.checked).toBe(true);
  expect(watermelon.checked).toBe(false);
  click(apple);
  expect(apple.checked).toBe(true);
  expect(orange.checked).toBe(true);
  expect(watermelon.checked).toBe(false);
});

test("checkbox onChange checked value", () => {
  const onChange = jest.fn();
  const Test = () => {
    const checkbox = useCheckboxState();
    return (
      <label>
        <Checkbox
          {...checkbox}
          onChange={(event) => onChange(event.target.checked)}
        />
        checkbox
      </label>
    );
  };
  const { getByLabelText } = render(<Test />);
  const checkbox = getByLabelText("checkbox") as HTMLInputElement;
  expect(checkbox.checked).toBe(false);
  expect(onChange).not.toBeCalled();
  click(checkbox);
  expect(checkbox.checked).toBe(true);
  expect(onChange).toBeCalledWith(true);
  click(checkbox);
  expect(checkbox.checked).toBe(false);
  expect(onChange).toBeCalledWith(false);
});

test("non-native checkbox onChange checked value", () => {
  const onChange = jest.fn();
  const Test = () => {
    const checkbox = useCheckboxState();
    return (
      <Checkbox
        {...checkbox}
        as="div"
        aria-label="checkbox"
        onChange={(event: any) => onChange(event.target.checked)}
      />
    );
  };
  const { getByLabelText } = render(<Test />);
  const checkbox = getByLabelText("checkbox") as HTMLInputElement;
  expect(checkbox.checked).toBe(false);
  expect(onChange).not.toBeCalled();
  click(checkbox);
  expect(checkbox.checked).toBe(true);
  expect(onChange).toBeCalledWith(true);
  click(checkbox);
  expect(checkbox.checked).toBe(false);
  expect(onChange).toBeCalledWith(false);
});

test("checkbox onChange checked value without useCheckboxState", () => {
  const onChange = jest.fn();
  const Test = () => {
    const [checked, setChecked] = React.useState(false);
    return (
      <label>
        <Checkbox
          checked={checked}
          onChange={(event) => {
            setChecked(event.target.checked);
            onChange(event.target.checked);
          }}
        />
        checkbox
      </label>
    );
  };
  const { getByLabelText } = render(<Test />);
  const checkbox = getByLabelText("checkbox") as HTMLInputElement;
  expect(checkbox.checked).toBe(false);
  expect(onChange).not.toBeCalled();
  click(checkbox);
  expect(checkbox.checked).toBe(true);
  expect(onChange).toBeCalledWith(true);
  click(checkbox);
  expect(checkbox.checked).toBe(false);
  expect(onChange).toBeCalledWith(false);
});

test("non-native checkbox onChange checked value without useCheckboxState", () => {
  const onChange = jest.fn();
  const Test = () => {
    const [checked, setChecked] = React.useState(false);
    return (
      <Checkbox
        as="div"
        aria-label="checkbox"
        checked={checked}
        onChange={(event: any) => {
          setChecked(event.target.checked);
          onChange(event.target.checked);
        }}
      />
    );
  };
  const { getByLabelText } = render(<Test />);
  const checkbox = getByLabelText("checkbox") as HTMLInputElement;
  expect(checkbox.checked).toBe(false);
  expect(onChange).not.toBeCalled();
  click(checkbox);
  expect(checkbox.checked).toBe(true);
  expect(onChange).toBeCalledWith(true);
  click(checkbox);
  expect(checkbox.checked).toBe(false);
  expect(onChange).toBeCalledWith(false);
});

test("non-native checkbox onClick preventDefault", () => {
  const Test = () => {
    const checkbox = useCheckboxState();
    return (
      <Checkbox
        {...checkbox}
        as="div"
        aria-label="checkbox"
        onClick={(event: React.MouseEvent) => event.preventDefault()}
      />
    );
  };
  const { getByLabelText } = render(<Test />);
  const checkbox = getByLabelText("checkbox") as HTMLInputElement;
  expect(checkbox.checked).toBe(false);
  click(checkbox);
  expect(checkbox.checked).toBe(false);
});

test("useCheckbox", () => {
  const Test = () => {
    const [checked, setChecked] = React.useState(false);
    const props = useCheckbox(
      {},
      {
        checked,
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          setChecked(event.target.checked),
      }
    );
    return (
      <label>
        <input {...props} />
        checkbox
      </label>
    );
  };
  const { getByLabelText } = render(<Test />);
  const checkbox = getByLabelText("checkbox") as HTMLInputElement;
  expect(checkbox.checked).toBe(false);
  expect(checkbox).toMatchInlineSnapshot(`
    <input
      aria-checked="false"
      type="checkbox"
    />
  `);
  click(checkbox);
  expect(checkbox.checked).toBe(true);
  expect(checkbox).toMatchInlineSnapshot(`
    <input
      aria-checked="true"
      type="checkbox"
    />
  `);
  click(checkbox);
  expect(checkbox.checked).toBe(false);
  expect(checkbox).toMatchInlineSnapshot(`
    <input
      aria-checked="false"
      type="checkbox"
    />
  `);
});
