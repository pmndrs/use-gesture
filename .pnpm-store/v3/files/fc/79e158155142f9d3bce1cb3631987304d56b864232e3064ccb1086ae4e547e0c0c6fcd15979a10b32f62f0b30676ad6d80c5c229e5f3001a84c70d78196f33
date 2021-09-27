import * as React from "react";
import { render } from "reakit-test-utils";
import {
  unstable_IdProps as IdProps,
  unstable_IdProvider as IdProvider,
  unstable_useIdState as useIdState,
  unstable_useId as useId,
  unstable_Id as Id,
} from "..";

// Basically puts the id prop into the aria-label prop
function TestId(props: IdProps) {
  return (
    <Id {...props}>
      {(htmlProps) => (
        <div {...htmlProps} aria-label={htmlProps.id}>
          {props.children}
        </div>
      )}
    </Id>
  );
}

test("Id", () => {
  const Test = () => {
    return (
      <>
        <TestId />
        <TestId />
      </>
    );
  };
  const { getAllByLabelText, rerender } = render(<Test />);
  const ids = getAllByLabelText(/id-[a-z\d]{2,}$/).map((el) => el.id);
  expect(ids).toHaveLength(2);
  // shouldn't change ids
  rerender(<Test />);
  const nextIds = getAllByLabelText(/id-[a-z\d]{2,}$/).map((el) => el.id);
  expect(ids).toEqual(nextIds);
});

test("Id with baseId", () => {
  const Test = () => {
    return (
      <>
        <TestId baseId="a" />
        <TestId baseId="a" />
      </>
    );
  };
  const { getAllByLabelText, rerender } = render(<Test />);
  const ids = getAllByLabelText(/a-[a-z\d]{2,}$/).map((el) => el.id);
  expect(ids).toHaveLength(2);
  // shouldn't change ids
  rerender(<Test />);
  const nextIds = getAllByLabelText(/a-[a-z\d]{2,}$/).map((el) => el.id);
  expect(ids).toEqual(nextIds);
});

test("Id within IdProvider", () => {
  const Test = () => {
    return (
      <IdProvider>
        <Id />
        <Id />
      </IdProvider>
    );
  };
  const { container } = render(<Test />);
  // IDs will be sequential because it's handled by the Provider
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        id="id-1"
      />
      <div
        id="id-2"
      />
    </div>
  `);
});

test("Id with baseId within IdProvider", () => {
  const Test = () => {
    return (
      <IdProvider>
        <Id baseId="a" />
        <Id baseId="a" />
      </IdProvider>
    );
  };
  const { container } = render(<Test />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        id="a-1"
      />
      <div
        id="a-2"
      />
    </div>
  `);
});

test("Id within IdProvider with prefix", () => {
  const Test = () => {
    return (
      <IdProvider prefix="a">
        <Id />
        <Id />
      </IdProvider>
    );
  };
  const { container } = render(<Test />);
  // IDs will be sequential because it's handled by the Provider
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        id="a-1"
      />
      <div
        id="a-2"
      />
    </div>
  `);
});

test("Id with useIdState", () => {
  const Test = () => {
    const id = useIdState();
    return (
      <>
        <TestId {...id} />
        <TestId {...id} />
      </>
    );
  };
  const { getByLabelText, rerender } = render(<Test />);
  const { id: id1 } = getByLabelText(/id-[a-z\d]{2,}-1$/);
  const { id: id2 } = getByLabelText(/id-[a-z\d]{2,}-2$/);
  // shouldn't change ids
  rerender(<Test />);
  getByLabelText(id1);
  getByLabelText(id2);
});

test("Id with useIdState within IdProvider", () => {
  const Test = () => {
    const id = useIdState();
    return (
      <>
        <Id {...id} />
        <Id {...id} />
      </>
    );
  };
  const { container } = render(
    <IdProvider>
      <Test />
    </IdProvider>
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        id="id-1-1"
      />
      <div
        id="id-1-2"
      />
    </div>
  `);
});

test("Id with useIdState within IdProvider with prefix", () => {
  const Test = () => {
    const id = useIdState();
    return (
      <>
        <Id {...id} />
        <Id {...id} />
      </>
    );
  };
  const { container } = render(
    <IdProvider prefix="a">
      <Test />
    </IdProvider>
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        id="a-1-1"
      />
      <div
        id="a-1-2"
      />
    </div>
  `);
});

test("Id with useIdState with baseId", () => {
  const Test = () => {
    const id = useIdState({ baseId: "a" });
    return (
      <>
        <Id {...id} />
        <Id {...id} />
      </>
    );
  };
  const { container } = render(<Test />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        id="a-1"
      />
      <div
        id="a-2"
      />
    </div>
  `);
});

test("Id with useIdState with baseId within IdProvider", () => {
  const Test = () => {
    const id = useIdState({ baseId: "a" });
    return (
      <>
        <Id {...id} />
        <Id {...id} />
      </>
    );
  };
  const { container } = render(
    <IdProvider>
      <Test />
    </IdProvider>
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        id="a-1"
      />
      <div
        id="a-2"
      />
    </div>
  `);
});

test("Id with useIdState with baseId within IdProvider with prefix", () => {
  const Test = () => {
    const id = useIdState({ baseId: "b" });
    return (
      <>
        <Id {...id} />
        <Id {...id} />
      </>
    );
  };
  const { container } = render(
    <IdProvider prefix="a">
      <Test />
    </IdProvider>
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        id="b-1"
      />
      <div
        id="b-2"
      />
    </div>
  `);
});

test("Id within IdProvider with useIdState with baseId", () => {
  const Test = () => {
    const id = useIdState({ baseId: "b" });
    return (
      <IdProvider>
        <Id {...id} />
        <Id {...id} />
      </IdProvider>
    );
  };
  const { container } = render(<Test />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        id="b-1"
      />
      <div
        id="b-2"
      />
    </div>
  `);
});

test("Id within IdProvider with prefix with useIdState with baseId", () => {
  const Test = () => {
    const id = useIdState({ baseId: "b" });
    return (
      <IdProvider prefix="a">
        <Id {...id} />
        <Id {...id} />
      </IdProvider>
    );
  };
  const { container } = render(<Test />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        id="b-1"
      />
      <div
        id="b-2"
      />
    </div>
  `);
});

test("useId", () => {
  const Test = () => {
    const { id } = useId();
    return <button aria-label={id} id={id} />;
  };
  const { getByLabelText, rerender } = render(<Test />);
  const { id } = getByLabelText(/id-[a-z\d]{2,}$/);
  // shouldn't change ids
  rerender(<Test />);
  const { id: nextId } = getByLabelText(/id-[a-z\d]{2,}$/);
  expect(id).toBe(nextId);
});

test("useId with id option", () => {
  const Test = (props: React.HTMLAttributes<any>) => {
    const { id } = useId(props);
    return <button aria-label={id} id={id} />;
  };
  const { getByLabelText } = render(<Test id="a" />);
  getByLabelText("a");
});

test("useId with id prop", () => {
  const Test = (props: React.HTMLAttributes<any>) => {
    const { id } = useId({}, props);
    return <button aria-label={id} id={id} />;
  };
  const { getByLabelText } = render(<Test id="a" />);
  getByLabelText("a");
});

test("useId with id prop and option", () => {
  const Test = (props: React.HTMLAttributes<any>) => {
    const { id } = useId({ id: "b" }, props);
    return <button aria-label={id} id={id} />;
  };
  const { getByLabelText } = render(<Test id="a" />);
  getByLabelText("a");
});
