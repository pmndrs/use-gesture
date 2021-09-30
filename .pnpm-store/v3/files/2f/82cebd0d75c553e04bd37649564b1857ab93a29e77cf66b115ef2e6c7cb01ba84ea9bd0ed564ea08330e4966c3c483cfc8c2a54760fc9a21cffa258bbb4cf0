import * as React from "react";
import { render, act, click, focus, press } from "reakit-test-utils";
import { Rover, useRoverState } from "..";

test("first rover is active", () => {
  const Test = () => {
    const rover = useRoverState();
    return (
      <>
        <Rover {...rover}>rover1</Rover>
        <Rover {...rover}>rover2</Rover>
        <Rover {...rover}>rover3</Rover>
      </>
    );
  };
  const { getByText } = render(<Test />);
  const rover1 = getByText("rover1");
  expect(rover1).toHaveAttribute("tabindex", "0");
});

test("move focus with keys", () => {
  const Test = () => {
    const rover = useRoverState();
    return (
      <>
        <Rover {...rover}>rover1</Rover>
        <Rover {...rover}>rover2</Rover>
        <Rover {...rover}>rover3</Rover>
      </>
    );
  };
  const { getByText } = render(<Test />);
  const rover1 = getByText("rover1");
  const rover2 = getByText("rover2");
  const rover3 = getByText("rover3");
  focus(rover1);
  expect(rover1).toHaveFocus();

  press.ArrowRight();
  expect(rover2).toHaveFocus();
  press.ArrowDown();
  expect(rover3).toHaveFocus();
  press.ArrowRight();
  expect(rover3).toHaveFocus();

  press.ArrowLeft();
  expect(rover2).toHaveFocus();
  press.ArrowUp();
  expect(rover1).toHaveFocus();
  press.ArrowLeft();
  expect(rover1).toHaveFocus();

  press.End();
  expect(rover3).toHaveFocus();
  press.Home();
  expect(rover1).toHaveFocus();
  press.PageDown();
  expect(rover3).toHaveFocus();
  press.PageUp();
  expect(rover1).toHaveFocus();
});

test("move focus with keys disabled", () => {
  const Test = () => {
    const rover = useRoverState();
    return (
      <>
        <Rover {...rover}>rover1</Rover>
        <Rover {...rover} disabled focusable>
          rover2
        </Rover>
        <Rover {...rover} disabled>
          rover3
        </Rover>
        <Rover {...rover}>rover4</Rover>
        <Rover {...rover} disabled>
          rover5
        </Rover>
      </>
    );
  };
  const { getByText } = render(<Test />);
  const rover1 = getByText("rover1");
  const rover2 = getByText("rover2");
  const rover4 = getByText("rover4");
  focus(rover1);
  expect(rover1).toHaveFocus();

  press.ArrowRight();
  expect(rover2).toHaveFocus();
  press.ArrowDown();
  expect(rover4).toHaveFocus();
  press.ArrowRight();
  expect(rover4).toHaveFocus();

  press.ArrowLeft();
  expect(rover2).toHaveFocus();
  press.ArrowUp();
  expect(rover1).toHaveFocus();
  press.ArrowLeft();
  expect(rover1).toHaveFocus();

  press.End();
  expect(rover4).toHaveFocus();
  press.Home();
  expect(rover1).toHaveFocus();
  press.PageDown();
  expect(rover4).toHaveFocus();
  press.PageUp();
  expect(rover1).toHaveFocus();
});

test("move focus with keys and horizontal orientation", () => {
  const Test = () => {
    const rover = useRoverState({ orientation: "horizontal" });
    return (
      <>
        <Rover {...rover}>rover1</Rover>
        <Rover {...rover}>rover2</Rover>
        <Rover {...rover}>rover3</Rover>
      </>
    );
  };
  const { getByText } = render(<Test />);
  const rover1 = getByText("rover1");
  const rover2 = getByText("rover2");
  const rover3 = getByText("rover3");
  focus(rover1);
  expect(rover1).toHaveFocus();

  press.ArrowRight();
  expect(rover2).toHaveFocus();
  press.ArrowDown();
  expect(rover2).toHaveFocus();
  press.ArrowRight();
  expect(rover3).toHaveFocus();

  press.ArrowLeft();
  expect(rover2).toHaveFocus();
  press.ArrowUp();
  expect(rover2).toHaveFocus();
  press.ArrowLeft();
  expect(rover1).toHaveFocus();
});

test("move focus with keys and vertical orientation", () => {
  const Test = () => {
    const rover = useRoverState({ orientation: "vertical" });
    return (
      <>
        <Rover {...rover}>rover1</Rover>
        <Rover {...rover}>rover2</Rover>
        <Rover {...rover}>rover3</Rover>
      </>
    );
  };
  const { getByText } = render(<Test />);
  const rover1 = getByText("rover1");
  const rover2 = getByText("rover2");
  const rover3 = getByText("rover3");
  focus(rover1);
  expect(rover1).toHaveFocus();

  press.ArrowDown();
  expect(rover2).toHaveFocus();
  press.ArrowRight();
  expect(rover2).toHaveFocus();
  press.ArrowDown();
  expect(rover3).toHaveFocus();

  press.ArrowUp();
  expect(rover2).toHaveFocus();
  press.ArrowLeft();
  expect(rover2).toHaveFocus();
  press.ArrowUp();
  expect(rover1).toHaveFocus();
});

test("move focus by calling state callbacks", () => {
  const Test = () => {
    const rover = useRoverState();
    return (
      <>
        <button onClick={rover.first}>first</button>
        <Rover {...rover}>rover1</Rover>
        <Rover {...rover}>rover2</Rover>
        <Rover {...rover}>rover3</Rover>
      </>
    );
  };
  const { getByText } = render(<Test />);
  const first = getByText("first");
  const rover1 = getByText("rover1");
  focus(first);
  expect(first).toHaveFocus();

  click(first);
  expect(rover1).toHaveFocus();

  focus(first);
  expect(first).toHaveFocus();

  click(first);
  expect(rover1).toHaveFocus();
});

test("move focus in nested rover", () => {
  const Test = () => {
    const rover1 = useRoverState({ orientation: "horizontal" });
    const rover2 = useRoverState({ orientation: "vertical" });
    return (
      <>
        <Rover {...rover1}>rover11</Rover>
        <Rover {...rover1} as="div">
          rover12
          <Rover {...rover2}>rover21</Rover>
          <Rover {...rover2}>rover22</Rover>
          <Rover {...rover2}>rover23</Rover>
        </Rover>
        <Rover {...rover1}>rover13</Rover>
      </>
    );
  };
  const { getByText } = render(<Test />);
  const rover11 = getByText("rover11");
  const rover12 = getByText("rover12");
  const rover13 = getByText("rover13");
  const rover21 = getByText("rover21");
  const rover22 = getByText("rover22");
  const rover23 = getByText("rover23");
  focus(rover11);
  expect(rover11).toHaveFocus();

  press.ArrowRight();
  expect(rover12).toHaveFocus();
  press.ArrowRight();
  expect(rover13).toHaveFocus();

  focus(rover22);
  expect(rover22).toHaveFocus();

  press.ArrowDown();
  expect(rover23).toHaveFocus();
  press.ArrowUp();
  expect(rover22).toHaveFocus();
  press.ArrowUp();
  expect(rover21).toHaveFocus();
  press.ArrowDown();
  expect(rover22).toHaveFocus();

  press.ArrowLeft();
  expect(rover11).toHaveFocus();
});

test("keep rover DOM order", () => {
  const Test = ({ renderRover2 = false }) => {
    const rover = useRoverState();
    return (
      <>
        <Rover {...rover}>rover1</Rover>
        {renderRover2 && <Rover {...rover}>rover2</Rover>}
        <Rover {...rover}>rover3</Rover>
      </>
    );
  };
  const { getByText, rerender } = render(<Test />);
  const rover1 = getByText("rover1");
  const rover3 = getByText("rover3");
  focus(rover1);
  expect(rover1).toHaveFocus();

  press.ArrowRight();
  expect(rover3).toHaveFocus();

  rerender(<Test renderRover2 />);
  expect(rover3).toHaveFocus();

  const rover2 = getByText("rover2");

  press.ArrowLeft();
  expect(rover2).toHaveFocus();
});

test("focus another component right after focusing rover", () => {
  const Test = () => {
    const rover = useRoverState();
    return (
      <>
        <Rover {...rover}>rover1</Rover>
        <Rover {...rover}>rover2</Rover>
        <Rover {...rover}>rover3</Rover>
        <button>button</button>
      </>
    );
  };
  const { getByText } = render(<Test />);
  const rover1 = getByText("rover1");
  const button = getByText("button");
  act(() => {
    // Puting both in the same act so rover focus effects will run only after
    // receives focus
    rover1.focus();
    button.focus();
  });
  expect(button).toHaveFocus();
});
