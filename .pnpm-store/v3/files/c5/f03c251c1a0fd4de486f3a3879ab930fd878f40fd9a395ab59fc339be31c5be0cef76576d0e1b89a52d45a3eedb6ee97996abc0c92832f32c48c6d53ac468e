import * as React from "react";
import { render, axe } from "reakit-test-utils";
import { Provider } from "../../../../Provider";
import ButtonWithTooltip from "..";

test("a11y", async () => {
  const { baseElement } = render(<ButtonWithTooltip />);
  expect(await axe(baseElement)).toHaveNoViolations();
});

test("markup", () => {
  const { baseElement } = render(
    <Provider>
      <ButtonWithTooltip />
    </Provider>
  );
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <button
          aria-describedby="id-1"
          tabindex="0"
          type="button"
        >
          Button
        </button>
      </div>
      <div
        class="__reakit-portal"
      >
        <div
          hidden=""
          id="id-1"
          role="tooltip"
          style="display: none; position: fixed; left: 100%; top: 100%; pointer-events: none;"
        >
          Tooltip
        </div>
      </div>
    </body>
  `);
});
