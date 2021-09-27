import * as React from "react";
import { render } from "reakit-test-utils";
import { Role, RoleProps } from "../Role";

test("render", () => {
  const { getByText } = render(<Role>role</Role>);
  expect(getByText("role")).toMatchInlineSnapshot(`
    <div>
      role
    </div>
  `);
});

test("do not re-render if unstable_system is the same", () => {
  const onRender = jest.fn();
  const Test = React.memo(({ unstable_system }: RoleProps) => {
    React.useEffect(onRender);
    return <Role unstable_system={unstable_system} />;
  }, Role.unstable_propsAreEqual);
  const { rerender } = render(<Test />);
  expect(onRender).toHaveBeenCalledTimes(1);
  rerender(<Test unstable_system={{ b: "b" }} />);
  expect(onRender).toHaveBeenCalledTimes(2);
  rerender(<Test unstable_system={{ b: "b" }} />);
  expect(onRender).toHaveBeenCalledTimes(2);
});
