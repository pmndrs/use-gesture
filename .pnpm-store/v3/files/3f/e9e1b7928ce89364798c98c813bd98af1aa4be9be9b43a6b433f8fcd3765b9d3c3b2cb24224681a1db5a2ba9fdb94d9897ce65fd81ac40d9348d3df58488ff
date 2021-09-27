import * as React from "react";
import { render } from "reakit-test-utils";
import { useForkRef } from "../useForkRef";

test("useForkRef", () => {
  expect.assertions(2);
  const externalRef = React.createRef<HTMLElement>();

  const Component = React.forwardRef((props, ref) => {
    const internalRef = React.useRef<HTMLElement>(null);
    React.useEffect(() => {
      expect(internalRef.current).toBeInTheDocument();
    }, []);
    return <div ref={useForkRef(internalRef, ref)} {...props} />;
  });

  render(<Component ref={externalRef} />);

  expect(externalRef.current).toBeInTheDocument();
});
