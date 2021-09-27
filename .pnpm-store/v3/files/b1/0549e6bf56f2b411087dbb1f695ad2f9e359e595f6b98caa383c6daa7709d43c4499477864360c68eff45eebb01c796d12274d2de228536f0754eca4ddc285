import * as React from "react";
import { act, render, hover, focus } from "reakit-test-utils";
import { Tooltip, TooltipReference, useTooltipState } from "..";

function advanceTimersByTime(ms: number) {
  act(() => {
    jest.advanceTimersByTime(ms);
  });
}

afterEach(async () => {
  hover(document.body);
});

test("show tooltip on hover", () => {
  const Test = () => {
    const tooltip = useTooltipState();
    return (
      <>
        <TooltipReference {...tooltip}>reference</TooltipReference>
        <Tooltip {...tooltip}>tooltip</Tooltip>
      </>
    );
  };
  const { baseElement, getByText: text } = render(<Test />);
  expect(text("tooltip")).not.toBeVisible();
  hover(text("reference"));
  expect(text("tooltip")).toBeVisible();
  hover(baseElement);
  expect(text("tooltip")).not.toBeVisible();
});

test("show only one tooltip", () => {
  const Test = () => {
    const tooltip1 = useTooltipState();
    const tooltip2 = useTooltipState();
    return (
      <>
        <TooltipReference {...tooltip1}>reference1</TooltipReference>
        <Tooltip {...tooltip1}>tooltip1</Tooltip>
        <TooltipReference {...tooltip2}>reference2</TooltipReference>
        <Tooltip {...tooltip2}>tooltip2</Tooltip>
      </>
    );
  };
  const { getByText: text } = render(<Test />);
  expect(text("tooltip1")).not.toBeVisible();
  expect(text("tooltip2")).not.toBeVisible();
  focus(text("reference1"));
  expect(text("tooltip1")).toBeVisible();
  expect(text("tooltip2")).not.toBeVisible();
  hover(text("reference2"));
  expect(text("tooltip1")).not.toBeVisible();
  expect(text("tooltip2")).toBeVisible();
});

test("show tooltip with a timeout", () => {
  const Test = () => {
    const tooltip = useTooltipState({ unstable_timeout: 250 });
    return (
      <>
        <TooltipReference {...tooltip}>reference</TooltipReference>
        <Tooltip {...tooltip}>tooltip</Tooltip>
      </>
    );
  };
  const { baseElement, getByText: text } = render(<Test />);
  jest.useFakeTimers();
  expect(text("tooltip")).not.toBeVisible();
  hover(text("reference"));
  expect(text("tooltip")).not.toBeVisible();
  advanceTimersByTime(249);
  hover(baseElement);
  expect(text("tooltip")).not.toBeVisible();
  advanceTimersByTime(1);
  expect(text("tooltip")).not.toBeVisible();
  hover(text("reference"));
  advanceTimersByTime(249);
  expect(text("tooltip")).not.toBeVisible();
  advanceTimersByTime(1);
  expect(text("tooltip")).toBeVisible();
  jest.useRealTimers();
});

test("show tooltip immediately if there is another one visible", () => {
  const Test = () => {
    const tooltip1 = useTooltipState({ unstable_timeout: 500 });
    const tooltip2 = useTooltipState({ unstable_timeout: 300 });
    return (
      <>
        <TooltipReference {...tooltip1}>reference1</TooltipReference>
        <Tooltip {...tooltip1}>tooltip1</Tooltip>
        <TooltipReference {...tooltip2}>reference2</TooltipReference>
        <Tooltip {...tooltip2}>tooltip2</Tooltip>
      </>
    );
  };
  const { getByText: text } = render(<Test />);
  jest.useFakeTimers();
  expect(text("tooltip1")).not.toBeVisible();
  expect(text("tooltip2")).not.toBeVisible();
  focus(text("reference1"));
  advanceTimersByTime(499);
  expect(text("tooltip1")).not.toBeVisible();
  expect(text("tooltip2")).not.toBeVisible();
  hover(text("reference2"));
  expect(text("tooltip1")).not.toBeVisible();
  expect(text("tooltip2")).not.toBeVisible();
  advanceTimersByTime(1);
  expect(text("tooltip1")).not.toBeVisible();
  expect(text("tooltip2")).not.toBeVisible();
  advanceTimersByTime(499);
  expect(text("tooltip1")).not.toBeVisible();
  expect(text("tooltip2")).toBeVisible();
  hover(text("reference1"));
  expect(text("tooltip1")).toBeVisible();
  expect(text("tooltip2")).not.toBeVisible();
});
