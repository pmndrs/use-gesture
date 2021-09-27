import * as React from "react";
import { render, press, screen, axe } from "reakit-test-utils";
import CompositeVirtualAsProp from "..";

test("navigate through composite items", () => {
  render(<CompositeVirtualAsProp />);
  press.Tab();
  press.ArrowDown();
  expect(screen.getByLabelText("events")).toMatchInlineSnapshot(`
    <ul
      aria-label="events"
    >
      <li>
        focus composite
      </li>
      <li>
        focus Item 1
      </li>
      <li>
        focus composite - Item 1
      </li>
      <li>
        keyup composite (Tab)
      </li>
      <li>
        keydown Item 1 (ArrowDown)
      </li>
      <li>
        keydown composite - Item 1 (ArrowDown)
      </li>
      <li>
        blur Item 1
      </li>
      <li>
        blur composite - Item 1
      </li>
      <li>
        focus Item 2
      </li>
      <li>
        focus composite - Item 2
      </li>
      <li>
        keyup Item 2 (ArrowDown)
      </li>
      <li>
        keyup composite - Item 2 (ArrowDown)
      </li>
    </ul>
  `);
});

test("a11y", async () => {
  const { baseElement } = render(<CompositeVirtualAsProp />);
  expect(await axe(baseElement)).toHaveNoViolations();
});
