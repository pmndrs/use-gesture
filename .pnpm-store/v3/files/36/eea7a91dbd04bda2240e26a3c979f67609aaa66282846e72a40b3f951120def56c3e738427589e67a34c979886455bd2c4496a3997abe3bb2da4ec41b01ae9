import * as React from "react";
import { render, click, press } from "reakit-test-utils";
import { Radio, RadioGroup, useRadioState } from "..";

test("click on radio", () => {
  const Test = () => {
    const radio = useRadioState();
    return (
      <label>
        <Radio {...radio} value="radio" />
        radio
      </label>
    );
  };
  const { getByLabelText } = render(<Test />);
  const radio = getByLabelText("radio") as HTMLInputElement;
  expect(radio.checked).toBe(false);
  click(radio);
  expect(radio.checked).toBe(true);
});

test("click on non-native radio", () => {
  const Test = () => {
    const radio = useRadioState();
    return <Radio {...radio} as="div" value="radio" aria-label="radio" />;
  };
  const { getByLabelText } = render(<Test />);
  const radio = getByLabelText("radio") as HTMLInputElement;
  expect(radio.checked).toBe(false);
  click(radio);
  expect(radio.checked).toBe(true);
});

test("onChange", () => {
  const Test = () => {
    const { state, setState, ...radio } = useRadioState();
    const [checked, setChecked] = React.useState(false);
    const toggle = () => setChecked(!checked);
    return (
      <label>
        <Radio {...radio} value="radio" onChange={toggle} checked={checked} />
        radio
      </label>
    );
  };
  const { getByLabelText } = render(<Test />);
  const radio = getByLabelText("radio") as HTMLInputElement;
  expect(radio.checked).toBe(false);
  click(radio);
  expect(radio.checked).toBe(true);
});

test("Native radio onChange called only once when clicked", async () => {
  const Test = () => {
    const { state, setState, ...radio } = useRadioState();
    const [checked, setChecked] = React.useState(false);
    const [counter, setCounter] = React.useState(0);
    const toggle = () => {
      setCounter((s) => s + 1);
      setChecked(!checked);
    };
    return (
      <>
        <label>
          <Radio {...radio} value="radio" onChange={toggle} checked={checked} />
          radio
        </label>
        <p data-testid="counter">{counter}</p>
      </>
    );
  };
  const { getByLabelText, getByTestId } = render(<Test />);
  const radio = getByLabelText("radio") as HTMLInputElement;
  click(radio);

  const counter = getByTestId("counter") as HTMLElement;
  expect(counter).toHaveTextContent("1");
});

test("onChange non-native radio", () => {
  const Test = () => {
    const { state, setState, ...radio } = useRadioState();
    const [checked, setChecked] = React.useState(false);
    const toggle = () => setChecked(!checked);
    return (
      <Radio
        {...radio}
        as="div"
        value="radio"
        onChange={toggle}
        checked={checked}
        aria-label="radio"
      />
    );
  };
  const { getByLabelText } = render(<Test />);
  const radio = getByLabelText("radio") as HTMLInputElement;
  expect(radio.checked).toBe(false);
  click(radio);
  expect(radio.checked).toBe(true);
});

[true, false].forEach((virtual) => {
  describe(virtual ? "aria-activedescendant" : "roving-tabindex", () => {
    test("arrow keys", () => {
      const Test = () => {
        const radio = useRadioState({ unstable_virtual: virtual });
        return (
          <>
            <RadioGroup {...radio} aria-label="radiogroup">
              <label>
                <Radio {...radio} value="a" />a
              </label>
              <label>
                <Radio {...radio} value="b" />b
              </label>
              <label>
                <Radio {...radio} value="c" />c
              </label>
            </RadioGroup>
            <button>button</button>
          </>
        );
      };
      const { getByLabelText } = render(<Test />);
      press.Tab();
      expect(getByLabelText("a")).toHaveFocus();
      expect(getByLabelText("a")).not.toBeChecked();
      press.ArrowLeft();
      expect(getByLabelText("c")).toHaveFocus();
      expect(getByLabelText("c")).toBeChecked();
      press.ArrowRight();
      expect(getByLabelText("a")).toHaveFocus();
      expect(getByLabelText("a")).toBeChecked();
      press.ArrowDown();
      expect(getByLabelText("b")).toHaveFocus();
      expect(getByLabelText("b")).toBeChecked();
      press.Tab();
      press.ShiftTab();
      expect(getByLabelText("b")).toHaveFocus();
      expect(getByLabelText("b")).toBeChecked();
    });

    test("initial checked radio gets initial focus", () => {
      const Test = () => {
        const radio = useRadioState({ unstable_virtual: virtual, state: "b" });
        return (
          <RadioGroup {...radio} aria-label="radiogroup">
            <label>
              <Radio {...radio} value="a" />a
            </label>
            <label>
              <Radio {...radio} value="b" />b
            </label>
            <label>
              <Radio {...radio} value="c" />c
            </label>
          </RadioGroup>
        );
      };
      const { getByLabelText } = render(<Test />);
      press.Tab();
      expect(getByLabelText("b")).toHaveFocus();
    });
  });
});

test("group", () => {
  const Test = () => {
    const radio = useRadioState({ baseId: "base" });
    return (
      <RadioGroup {...radio} aria-label="radiogroup">
        <label>
          <Radio {...radio} value="a" />a
        </label>
        <label>
          <Radio {...radio} value="b" />b
        </label>
        <label>
          <Radio {...radio} value="c" />c
        </label>
      </RadioGroup>
    );
  };
  const { container } = render(<Test />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        aria-label="radiogroup"
        id="base"
        role="radiogroup"
      >
        <label>
          <input
            aria-checked="false"
            id="base-1"
            name="base"
            tabindex="0"
            type="radio"
            value="a"
          />
          a
        </label>
        <label>
          <input
            aria-checked="false"
            id="base-2"
            name="base"
            tabindex="-1"
            type="radio"
            value="b"
          />
          b
        </label>
        <label>
          <input
            aria-checked="false"
            id="base-3"
            name="base"
            tabindex="-1"
            type="radio"
            value="c"
          />
          c
        </label>
      </div>
    </div>
  `);
});

test("button group", () => {
  const Test = () => {
    const radio = useRadioState({ baseId: "base" });
    return (
      <RadioGroup {...radio} aria-label="radiogroup">
        <Radio {...radio} as="button" value="a">
          a
        </Radio>
        <Radio {...radio} as="button" value="b">
          b
        </Radio>
        <Radio {...radio} as="button" value="c">
          c
        </Radio>
      </RadioGroup>
    );
  };
  const { container } = render(<Test />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        aria-label="radiogroup"
        id="base"
        role="radiogroup"
      >
        <button
          aria-checked="false"
          id="base-1"
          role="radio"
          tabindex="0"
        >
          a
        </button>
        <button
          aria-checked="false"
          id="base-2"
          role="radio"
          tabindex="-1"
        >
          b
        </button>
        <button
          aria-checked="false"
          id="base-3"
          role="radio"
          tabindex="-1"
        >
          c
        </button>
      </div>
    </div>
  `);
});

test("empty strings can be checked", () => {
  // See https://github.com/reakit/reakit/issues/607
  const Test = () => {
    const radio = useRadioState();
    return (
      <RadioGroup {...radio} aria-label="radiogroup" id="base">
        <Radio {...radio} value="" aria-label="empty-string" />
      </RadioGroup>
    );
  };

  const { getByLabelText } = render(<Test />);

  expect(getByLabelText("empty-string")).not.toBeChecked();
  click(getByLabelText("empty-string"));
  expect(getByLabelText("empty-string")).toBeChecked();
  expect(getByLabelText("empty-string")).toHaveFocus();
});

test("falsy numbers can be checked", () => {
  // See https://github.com/reakit/reakit/issues/607
  const Test = () => {
    const radio = useRadioState();
    return (
      <RadioGroup {...radio} aria-label="radiogroup" id="base">
        <Radio {...radio} value={0} aria-label="zero" />
      </RadioGroup>
    );
  };

  const { getByLabelText } = render(<Test />);

  expect(getByLabelText("zero")).not.toBeChecked();
  click(getByLabelText("zero"));
  expect(getByLabelText("zero")).toBeChecked();
  expect(getByLabelText("zero")).toHaveFocus();
});
