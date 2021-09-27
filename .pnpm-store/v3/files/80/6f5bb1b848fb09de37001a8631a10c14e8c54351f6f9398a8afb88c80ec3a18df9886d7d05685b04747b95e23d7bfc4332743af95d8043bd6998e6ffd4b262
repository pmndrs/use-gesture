import * as React from "react";
import { render, screen, press, click } from "reakit-test-utils";
import VirtualCompositeWithFocusBlur from "..";

test("focus/blur on virtual composite with mouse click", () => {
  const { baseElement } = render(<VirtualCompositeWithFocusBlur />);
  click(screen.getByText("item-2"));
  click(screen.getByText("item-3"));
  click(screen.getByText("item-6"));
  click(screen.getByText("item-6"));
  click(baseElement);
  expect(screen.getByRole("log")).toMatchInlineSnapshot(`
    <div
      role="log"
    >
      <ul>
        <li>
          focus item-2
        </li>
        <li>
          focus container - item-2
        </li>
        <li>
          blur item-2
        </li>
        <li>
          blur container - item-2
        </li>
        <li>
          focus item-3
        </li>
        <li>
          focus container - item-3
        </li>
        <li>
          blur item-3
        </li>
        <li>
          blur container - item-3
        </li>
        <li>
          focus item-6
        </li>
        <li>
          focus container - item-6
        </li>
        <li>
          focus item-6
        </li>
        <li>
          focus container - item-6
        </li>
        <li>
          blur item-6
        </li>
        <li>
          blur container - item-6
        </li>
        <li>
          blur container
        </li>
      </ul>
    </div>
  `);
});

test("focus/blur on virtual composite with keyboard", () => {
  render(<VirtualCompositeWithFocusBlur />);
  press.Tab();
  press.ArrowDown();
  press.End();
  press.ArrowUp();
  press.Home();
  expect(screen.getByRole("log")).toMatchInlineSnapshot(`
    <div
      role="log"
    >
      <ul>
        <li>
          focus container
        </li>
        <li>
          focus item-0
        </li>
        <li>
          focus container - item-0
        </li>
        <li>
          blur item-0
        </li>
        <li>
          blur container - item-0
        </li>
        <li>
          focus item-1
        </li>
        <li>
          focus container - item-1
        </li>
        <li>
          blur item-1
        </li>
        <li>
          blur container - item-1
        </li>
        <li>
          focus item-9
        </li>
        <li>
          focus container - item-9
        </li>
        <li>
          blur item-9
        </li>
        <li>
          blur container - item-9
        </li>
        <li>
          focus item-8
        </li>
        <li>
          focus container - item-8
        </li>
        <li>
          blur item-8
        </li>
        <li>
          blur container - item-8
        </li>
        <li>
          focus item-0
        </li>
        <li>
          focus container - item-0
        </li>
      </ul>
    </div>
  `);
});

test("focus/blur on virtual composite with mouse click and then with keyboard", () => {
  render(<VirtualCompositeWithFocusBlur />);
  click(screen.getByText("item-1"));
  press.ArrowDown();
  expect(screen.getByRole("log")).toMatchInlineSnapshot(`
    <div
      role="log"
    >
      <ul>
        <li>
          focus item-1
        </li>
        <li>
          focus container - item-1
        </li>
        <li>
          blur item-1
        </li>
        <li>
          blur container - item-1
        </li>
        <li>
          focus item-2
        </li>
        <li>
          focus container - item-2
        </li>
      </ul>
    </div>
  `);
});
