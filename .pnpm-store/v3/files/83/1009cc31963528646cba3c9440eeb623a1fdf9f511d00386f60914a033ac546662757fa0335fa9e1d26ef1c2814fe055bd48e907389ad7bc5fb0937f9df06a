import { UnionToIntersection } from "reakit-utils/types";
import { SystemContextType } from "./SystemContext";
/**
 * Merges multiple system objects into a single system object.
 *
 * @example
 * import { Provider } from "reakit";
 * import { mergeSystem } from "reakit-system";
 * import * as bootstrapSystem from "reakit-system-bootstrap";
 *
 * const mySystem = {
 *   useButtonProps() {},
 * };
 *
 * const system = mergeSystem(bootstrapSystem, mySystem);
 *
 * function App() {
 *   return (
 *     <Provider unstable_system={system}>
 *       <div>App</div>
 *     </Provider>
 *   );
 * }
 */
export declare function mergeSystem<T extends SystemContextType[]>(...systems: T): UnionToIntersection<T[number]>;
