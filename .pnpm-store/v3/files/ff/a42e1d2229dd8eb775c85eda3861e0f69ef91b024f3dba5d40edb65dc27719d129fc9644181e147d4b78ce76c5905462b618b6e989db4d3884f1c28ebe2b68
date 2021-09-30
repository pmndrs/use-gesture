import * as Polymorphic from "@radix-ui/react-polymorphic";
import * as React from "react";
declare const DEFAULT_TAG = "div";
type PrimitiveOwnProps = {};
export type PrimitivePrimitive = Polymorphic.ForwardRefComponent<typeof DEFAULT_TAG, PrimitiveOwnProps>;
export const Primitive: PrimitivePrimitive;
export const Root: PrimitivePrimitive;
export type ExtendedPrimitive<C, As> = Polymorphic.ForwardRefComponent<As, Polymorphic.OwnProps<C>>;
type DefaultProps<C, As> = {
    as?: As;
} & Omit<Partial<React.ComponentProps<ExtendedPrimitive<C, As>>>, 'as'>;
export function extendPrimitive<C extends Polymorphic.ForwardRefComponent<any, any>, DefaultAs extends React.ElementType = Polymorphic.IntrinsicElement<C>>(Comp: C, config: {
    displayName?: string;
    defaultProps?: DefaultProps<C, DefaultAs>;
}): ExtendedPrimitive<C, DefaultAs>;

//# sourceMappingURL=index.d.ts.map
