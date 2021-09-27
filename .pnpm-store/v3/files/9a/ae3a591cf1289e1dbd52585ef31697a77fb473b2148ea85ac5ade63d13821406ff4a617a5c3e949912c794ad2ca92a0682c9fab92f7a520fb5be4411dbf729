import * as React from "react";
import { render, screen } from "reakit-test-utils";
import { fireBlurEvent } from "../fireBlurEvent";

type ComponentProps = {
  onBlur?: (event: FocusEvent) => void;
  onFocusOut?: (event: FocusEvent) => void;
  onReactBlur?: React.FocusEventHandler;
};

function noop() {}

function Component({
  onBlur = noop,
  onFocusOut = noop,
  onReactBlur = noop,
}: ComponentProps) {
  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    const element = ref.current;
    element?.addEventListener("blur", onBlur);
    element?.addEventListener("focusout", onFocusOut);
    return () => {
      element?.removeEventListener("blur", onBlur);
      element?.removeEventListener("focusout", onFocusOut);
    };
  });
  return (
    <>
      <button>button1</button>
      <button ref={ref} onBlur={onReactBlur}>
        button2
      </button>
    </>
  );
}

test("onBlur", () => {
  const onBlur = jest.fn((event) => event.relatedTarget);
  render(<Component onBlur={onBlur} />);
  const button1 = screen.getByText("button1");
  const button2 = screen.getByText("button2");
  expect(onBlur).not.toHaveBeenCalled();
  fireBlurEvent(button2, { relatedTarget: button1 });
  expect(onBlur).toHaveReturnedWith(button1);
});

test("onFocusOut", () => {
  const onFocusOut = jest.fn((event) => event.relatedTarget);
  render(<Component onFocusOut={onFocusOut} />);
  const button1 = screen.getByText("button1");
  const button2 = screen.getByText("button2");
  expect(onFocusOut).not.toHaveBeenCalled();
  fireBlurEvent(button2, { relatedTarget: button1 });
  expect(onFocusOut).toHaveReturnedWith(button1);
});

test("onReactBlur", () => {
  const onReactBlur = jest.fn((event) => event.relatedTarget);
  render(<Component onReactBlur={onReactBlur} />);
  const button1 = screen.getByText("button1");
  const button2 = screen.getByText("button2");
  expect(onReactBlur).not.toHaveBeenCalled();
  fireBlurEvent(button2, { relatedTarget: button1 });
  expect(onReactBlur).toHaveReturnedWith(button1);
});
