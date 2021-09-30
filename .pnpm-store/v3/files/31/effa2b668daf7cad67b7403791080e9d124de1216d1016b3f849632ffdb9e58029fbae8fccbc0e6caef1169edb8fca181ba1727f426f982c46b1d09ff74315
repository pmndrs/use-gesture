import * as React from "react";
import { render } from "reakit-test-utils";
import { DisclosureContent } from "../DisclosureContent";

test("render", () => {
  const { getByText } = render(
    <DisclosureContent id="base">content</DisclosureContent>
  );
  expect(getByText("content")).toMatchInlineSnapshot(`
    <div
      hidden=""
      id="base"
      style="display: none;"
    >
      content
    </div>
  `);
});

test("render visible", () => {
  const { getByText } = render(
    <DisclosureContent id="base" visible>
      content
    </DisclosureContent>
  );
  expect(getByText("content")).toMatchInlineSnapshot(`
    <div
      id="base"
    >
      content
    </div>
  `);
});
