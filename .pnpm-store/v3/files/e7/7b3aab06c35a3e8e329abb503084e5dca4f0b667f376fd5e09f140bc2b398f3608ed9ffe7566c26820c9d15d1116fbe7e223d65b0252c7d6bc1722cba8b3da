import * as React from "react";
import { render } from "reakit-test-utils";
import { Box, BoxProps } from "../Box";

test("render", () => {
  const { getByText } = render(<Box>box</Box>);
  expect(getByText("box")).toMatchInlineSnapshot(`
    <div>
      box
    </div>
  `);
});

test("do not re-render if unstable_system is the same", () => {
  const onRender = jest.fn();
  const Test = React.memo(({ unstable_system }: BoxProps) => {
    React.useEffect(onRender);
    return <Box unstable_system={unstable_system} />;
  }, Box.unstable_propsAreEqual);
  const { rerender } = render(<Test />);
  expect(onRender).toHaveBeenCalledTimes(1);
  rerender(<Test unstable_system={{ b: "b" }} />);
  expect(onRender).toHaveBeenCalledTimes(2);
  rerender(<Test unstable_system={{ b: "b" }} />);
  expect(onRender).toHaveBeenCalledTimes(2);
});
