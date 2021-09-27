import * as React from "react";
import { render } from "reakit-test-utils";
import { MenuArrow } from "../MenuArrow";

test("render", () => {
  const { baseElement } = render(<MenuArrow placement="top" />);
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <div
          style="font-size: 30px; width: 1em; height: 1em; pointer-events: none; top: 100%;"
        >
          <svg
            style="transform: rotateZ(180deg);"
            viewBox="0 0 30 30"
          >
            <path
              class="stroke"
              d="M23.7,27.1L17,19.9C16.5,19.3,15.8,19,15,19s-1.6,0.3-2.1,0.9l-6.6,7.2C5.3,28.1,3.4,29,2,29h26 C26.7,29,24.6,28.1,23.7,27.1z"
            />
            <path
              class="fill"
              d="M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z"
            />
          </svg>
        </div>
      </div>
    </body>
  `);
});
