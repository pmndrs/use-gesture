import * as React from "react";
import { render, focus, press, blur } from "reakit-test-utils";
import {
  unstable_CompositeItemWidgetProps as CompositeItemWidgetProps,
  unstable_CompositeItemWidget as CompositeItemWidget,
} from "../CompositeItemWidget";

const props: CompositeItemWidgetProps = {
  unstable_hasActiveWidget: false,
  unstable_setHasActiveWidget: jest.fn(),
  currentId: "a",
};

test("render", () => {
  const { container } = render(<CompositeItemWidget {...props} />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        data-composite-item-widget="true"
        tabindex="-1"
      />
    </div>
  `);
});

test("render active widget", () => {
  const { container } = render(
    <CompositeItemWidget {...props} unstable_hasActiveWidget />
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        data-composite-item-widget="true"
        tabindex="0"
      />
    </div>
  `);
});

test("render without state props", () => {
  // @ts-ignore
  const { container } = render(<CompositeItemWidget />);
  expect(container).toMatchInlineSnapshot(`
<div>
  <div
    data-composite-item-widget="true"
    tabindex="-1"
  />
</div>
`);
});

test("interact without state props", () => {
  const { getByLabelText } = render(
    // @ts-ignore
    <CompositeItemWidget as="input" aria-label="widget" />
  );
  const widget = getByLabelText("widget");
  focus(widget);
  press.Enter();
  press.Escape();
  blur();
});
