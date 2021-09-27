import * as React from "react";
import { render, click, focus, press } from "reakit-test-utils";
import { Clickable, ClickableProps } from "../Clickable";

test("render", () => {
  const { getByText } = render(<Clickable>clickable</Clickable>);
  expect(getByText("clickable")).toMatchInlineSnapshot(`
    <button>
      clickable
    </button>
  `);
});

test("render disabled", () => {
  const { getByText } = render(<Clickable disabled>clickable</Clickable>);
  expect(getByText("clickable")).toMatchInlineSnapshot(`
    <button
      aria-disabled="true"
      disabled=""
      style="pointer-events: none;"
    >
      clickable
    </button>
  `);
});

test("render disabled focusable", () => {
  const { getByText } = render(
    <Clickable disabled focusable>
      clickable
    </Clickable>
  );
  expect(getByText("clickable")).toMatchInlineSnapshot(`
    <button
      aria-disabled="true"
      style="pointer-events: none;"
    >
      clickable
    </button>
  `);
});

test("click", () => {
  const fn = jest.fn();
  const { getByText } = render(<Clickable onClick={fn}>clickable</Clickable>);
  const clickable = getByText("clickable");
  expect(fn).toHaveBeenCalledTimes(0);
  click(clickable);
  expect(fn).toHaveBeenCalledTimes(1);
});

test("click disabled", () => {
  const fn = jest.fn();
  const { getByText } = render(
    <Clickable onClick={fn} disabled>
      clickable
    </Clickable>
  );
  const clickable = getByText("clickable");
  click(clickable);
  expect(fn).toHaveBeenCalledTimes(0);
});

test("click enabled after disabled", () => {
  const fn = jest.fn();
  const { getByText, rerender } = render(
    <Clickable onClick={fn} disabled>
      clickable
    </Clickable>
  );
  const clickable = getByText("clickable");
  rerender(<Clickable onClick={fn}>clickable</Clickable>);
  click(clickable);
  expect(fn).toHaveBeenCalledTimes(1);
});

test("click disabled focusable", () => {
  const fn = jest.fn();
  const { getByText } = render(
    <Clickable onClick={fn} disabled focusable>
      clickable
    </Clickable>
  );
  const clickable = getByText("clickable");
  click(clickable);
  expect(fn).toHaveBeenCalledTimes(0);
});

test("focus", () => {
  const { getByText } = render(<Clickable>clickable</Clickable>);
  const clickable = getByText("clickable");
  expect(clickable).not.toHaveFocus();
  focus(clickable);
  expect(clickable).toHaveFocus();
});

test("focus disabled", () => {
  const { getByText } = render(<Clickable disabled>clickable</Clickable>);
  const clickable = getByText("clickable");
  expect(clickable).not.toHaveFocus();
  focus(clickable);
  expect(clickable).not.toHaveFocus();
});

test("focus disabled focusable", () => {
  const { getByText } = render(
    <Clickable disabled focusable>
      clickable
    </Clickable>
  );
  const clickable = getByText("clickable");
  expect(clickable).not.toHaveFocus();
  focus(clickable);
  expect(clickable).toHaveFocus();
});

test("non-native button click", () => {
  const fn = jest.fn();
  const { getByText } = render(
    <Clickable as="div" onClick={fn}>
      clickable
    </Clickable>
  );
  const clickable = getByText("clickable");
  expect(fn).toHaveBeenCalledTimes(0);
  click(clickable);
  expect(fn).toHaveBeenCalledTimes(1);
});

test("non-native button click disabled", () => {
  const fn = jest.fn();
  const { getByText } = render(
    <Clickable as="div" onClick={fn} disabled>
      clickable
    </Clickable>
  );
  const clickable = getByText("clickable");
  click(clickable);
  expect(fn).toHaveBeenCalledTimes(0);
});

test("non-native button click disabled focusable", () => {
  const fn = jest.fn();
  const { getByText } = render(
    <Clickable as="div" onClick={fn} disabled focusable>
      clickable
    </Clickable>
  );
  const clickable = getByText("clickable");
  click(clickable);
  expect(fn).toHaveBeenCalledTimes(0);
});

test("non-native button focus", () => {
  const { getByText } = render(<Clickable as="div">clickable</Clickable>);
  const clickable = getByText("clickable");
  expect(clickable).not.toHaveFocus();
  focus(clickable);
  expect(clickable).toHaveFocus();
});

test("non-native button focus disabled", () => {
  const { getByText } = render(
    <Clickable as="div" disabled>
      clickable
    </Clickable>
  );
  const clickable = getByText("clickable");
  expect(clickable).not.toHaveFocus();
  focus(clickable);
  expect(clickable).not.toHaveFocus();
});

test("non-native button focus disabled focusable", () => {
  const { getByText } = render(
    <Clickable as="div" disabled focusable>
      clickable
    </Clickable>
  );
  const clickable = getByText("clickable");
  expect(clickable).not.toHaveFocus();
  focus(clickable);
  expect(clickable).toHaveFocus();
});

test("non-native button space/enter", () => {
  const fn = jest.fn();
  const { getByText } = render(
    <Clickable as="div" onClick={fn}>
      clickable
    </Clickable>
  );
  const clickable = getByText("clickable");
  press.Enter(clickable);
  expect(fn).toHaveBeenCalledTimes(1);
  press.Space(clickable);
  expect(fn).toHaveBeenCalledTimes(2);
});

test("non-native button space/enter disabled", () => {
  const fn = jest.fn();
  const { getByText } = render(
    <Clickable as="div" disabled onClick={fn}>
      clickable
    </Clickable>
  );
  const clickable = getByText("clickable");
  press.Enter(clickable);
  press.Space(clickable);
  expect(fn).toHaveBeenCalledTimes(0);
});

test("non-native button space/enter metaKey", () => {
  const fn = jest.fn();
  const { getByText } = render(
    <Clickable as="div" onClick={fn}>
      clickable
    </Clickable>
  );
  const clickable = getByText("clickable");
  press.Enter(clickable, { metaKey: true });
  press.Space(clickable, { metaKey: true });
  expect(fn).toHaveBeenCalledTimes(0);
});

test("non-native button space/enter disabled focusable", () => {
  const fn = jest.fn();
  const { getByText } = render(
    <Clickable as="div" disabled focusable onClick={fn}>
      clickable
    </Clickable>
  );
  const clickable = getByText("clickable");
  press.Enter(clickable);
  press.Space(clickable);
  expect(fn).toHaveBeenCalledTimes(0);
});

test("press enter on Clickable as another non-native Clickable", () => {
  const onClick = jest.fn();
  const NonNativeClickable = React.forwardRef<HTMLDivElement, ClickableProps>(
    (props, ref) => <Clickable as="div" ref={ref} {...props} />
  );
  const { getByText } = render(
    <Clickable as={NonNativeClickable} onClick={onClick}>
      clickable
    </Clickable>
  );
  const clickable = getByText("clickable");
  press.Enter(clickable);
  expect(onClick).toHaveBeenCalledTimes(1);
});
