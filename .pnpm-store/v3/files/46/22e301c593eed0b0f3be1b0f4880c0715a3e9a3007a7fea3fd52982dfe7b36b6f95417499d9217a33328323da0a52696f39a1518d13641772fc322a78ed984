import * as React from "react";
import { render } from "reakit-test-utils";
import { CompositeGroupProps, CompositeGroup } from "../CompositeGroup";

const props: CompositeGroupProps = {
  registerGroup: jest.fn(),
  unregisterGroup: jest.fn(),
};

test("render", () => {
  const { container } = render(<CompositeGroup {...props} id="1" />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        id="1"
        role="group"
      />
    </div>
  `);
});

test("render without state props", () => {
  // @ts-ignore
  const { container } = render(<CompositeGroup id="1" />);
  expect(container).toMatchInlineSnapshot(`
<div>
  <div
    id="1"
    role="group"
  />
</div>
`);
});

test("do not re-render if group is not the current or the previous active one", () => {
  const onRender = jest.fn();
  const items = [
    { id: "item-1", groupId: "group-1", ref: React.createRef<HTMLElement>() },
    { id: "item-2", groupId: "group-2", ref: React.createRef<HTMLElement>() },
    { id: "item-3", groupId: "group-3", ref: React.createRef<HTMLElement>() },
  ];
  const Test = React.memo((groupProps: CompositeGroupProps) => {
    React.useEffect(onRender);
    return <CompositeGroup {...groupProps} />;
  }, CompositeGroup.unstable_propsAreEqual);
  const { rerender } = render(<Test {...props} items={items} id="group-1" />);
  expect(onRender).toHaveBeenCalledTimes(1);
  rerender(<Test {...props} items={items} currentId="item-1" id="group-1" />);
  expect(onRender).toHaveBeenCalledTimes(2);
  rerender(<Test {...props} items={items} currentId="item-2" id="group-1" />);
  expect(onRender).toHaveBeenCalledTimes(3);
  rerender(<Test {...props} items={items} currentId="item-3" id="group-1" />);
  expect(onRender).toHaveBeenCalledTimes(3);
  rerender(<Test {...props} items={items} currentId="item-3" id="group-2" />);
  expect(onRender).toHaveBeenCalledTimes(4);
  rerender(<Test {...props} items={items} currentId="item-3" id="group-3" />);
  expect(onRender).toHaveBeenCalledTimes(5);
});
