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
export declare function normalizePropsAreEqual<O, T extends As>(propsAreEqual: (prev: O, next: O) => boolean): (prev: PropsWithAs<O, T>, next: PropsWithAs<O, T>) => boolean;
