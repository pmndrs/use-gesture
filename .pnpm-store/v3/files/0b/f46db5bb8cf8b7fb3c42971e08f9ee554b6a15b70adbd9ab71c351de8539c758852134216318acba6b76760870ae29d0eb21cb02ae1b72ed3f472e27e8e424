import { isPlainObject } from "./isPlainObject";
import { As, PropsWithAs } from "./types";

/**
 * This higher order functions take `propsAreEqual` function and
 * returns a new function which normalizes the props.
 *
 * Normalizing in our case is making sure the `propsAreEqual` works with
 * both version 1 (object spreading) and version 2 (state object) state passing.
 *
 * To achieve this, the returned function in case of a state object
 * will spread the state object in both `prev` and `next props.
 *
 * Other case it just returns the function as is which makes sure
 * that we are still backward compatible
 */
export function normalizePropsAreEqual<O, T extends As>(
  propsAreEqual: (prev: O, next: O) => boolean
): (prev: PropsWithAs<O, T>, next: PropsWithAs<O, T>) => boolean {
  if (propsAreEqual.name === "normalizePropsAreEqualInner") {
    return (propsAreEqual as unknown) as (
      prev: PropsWithAs<O, T>,
      next: PropsWithAs<O, T>
    ) => boolean;
  }

  return function normalizePropsAreEqualInner(
    prev: PropsWithAs<O, T>,
    next: PropsWithAs<O, T>
  ) {
    if (!isPlainObject(prev.state) || !isPlainObject(next.state)) {
      return propsAreEqual((prev as unknown) as O, (next as unknown) as O);
    }

    return propsAreEqual(
      ({ ...prev.state, ...prev } as unknown) as O,
      ({
        ...next.state,
        ...next,
      } as unknown) as O
    );
  };
}
