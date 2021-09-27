import type { AssignableRef } from "./types";
/**
 * Passes or assigns an arbitrary value to a ref function or object.
 *
 * @param ref
 * @param value
 */
export declare function assignRef<RefValueType = any>(ref: AssignableRef<RefValueType> | null | undefined, value: any): void;
/**
 * Passes or assigns a value to multiple refs (typically a DOM node). Useful for
 * dealing with components that need an explicit ref for DOM calculations but
 * also forwards refs assigned by an app.
 *
 * @param refs Refs to fork
 */
export declare function useComposedRefs<RefValueType = any>(...refs: (AssignableRef<RefValueType> | null | undefined)[]): (node: any) => void;
