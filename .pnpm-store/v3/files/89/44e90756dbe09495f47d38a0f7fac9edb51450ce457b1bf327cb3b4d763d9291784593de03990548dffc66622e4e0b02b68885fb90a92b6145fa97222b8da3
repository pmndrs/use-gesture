import { transform } from "@babel/core";
// @ts-ignore
import babelPlugin from "../babel-plugin";

function join(...strings: string[]) {
  return strings.join("\n");
}

function compare(input: string, output: string) {
  const result = transform(input, {
    configFile: false,
    plugins: [babelPlugin],
  });
  expect(result?.code).toEqual(output);
}

test("should replace warning calls", () => {
  compare(
    join('warning(true, "a", "b");'),
    join(
      'process.env.NODE_ENV !== "production" ? warning(true, "a", "b") : void 0;'
    )
  );
});

test("should replace useWarning calls", () => {
  compare(
    join('useWarning(true, "a", "b");'),
    join(
      'process.env.NODE_ENV !== "production" ? useWarning(true, "a", "b") : void 0;'
    )
  );
});

test("should replace multiple warning calls", () => {
  compare(
    join(
      'warning(true, "a", "b");',
      'warning(false, "b", "a");',
      'warning(cond, "c");'
    ),
    join(
      'process.env.NODE_ENV !== "production" ? warning(true, "a", "b") : void 0;',
      'process.env.NODE_ENV !== "production" ? warning(false, "b", "a") : void 0;',
      'process.env.NODE_ENV !== "production" ? warning(cond, "c") : void 0;'
    )
  );
});
