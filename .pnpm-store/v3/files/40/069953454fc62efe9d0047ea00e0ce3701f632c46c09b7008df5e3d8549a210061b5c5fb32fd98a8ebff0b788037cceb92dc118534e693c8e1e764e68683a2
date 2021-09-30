import * as React from "react";
import * as PopperPrimitive from "@radix-ui/react-popper";
import * as Polymorphic from "@radix-ui/react-polymorphic";
type TooltipOwnProps = {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    /**
     * The duration from when the mouse enters the trigger until the tooltip gets opened.
     * (default: 700)
     */
    delayDuration?: number;
    /**
     * How much time a user has to enter another trigger without incurring a delay again.
     * (default: 300)
     */
    skipDelayDuration?: number;
};
export const Tooltip: React.FC<TooltipOwnProps>;
declare const TRIGGER_DEFAULT_TAG = "button";
type TooltipTriggerOwnProps = Omit<Polymorphic.OwnProps<typeof PopperPrimitive.Anchor>, 'virtualRef'>;
export type TooltipTriggerPrimitive = Polymorphic.ForwardRefComponent<typeof TRIGGER_DEFAULT_TAG, TooltipTriggerOwnProps>;
export const TooltipTrigger: TooltipTriggerPrimitive;
type TooltipContentOwnProps = Polymorphic.Merge<Polymorphic.OwnProps<typeof TooltipContentImpl>, {
    /**
     * Used to force mounting when more control is needed. Useful when
     * controlling animation with React animation libraries.
     */
    forceMount?: true;
}>;
export type TooltipContentPrimitive = Polymorphic.ForwardRefComponent<Polymorphic.IntrinsicElement<typeof TooltipContentImpl>, TooltipContentOwnProps>;
export const TooltipContent: TooltipContentPrimitive;
type TooltipContentImplOwnProps = Polymorphic.Merge<Polymorphic.OwnProps<typeof PopperPrimitive.Content>, {
    /**
     * A more descriptive label for accessibility purpose
     */
    'aria-label'?: string;
    /**
     * Whether the Tooltip should render in a Portal
     * (default: `true`)
     */
    portalled?: boolean;
}>;
type TooltipContentImplPrimitive = Polymorphic.ForwardRefComponent<Polymorphic.IntrinsicElement<typeof PopperPrimitive.Content>, TooltipContentImplOwnProps>;
declare const TooltipContentImpl: TooltipContentImplPrimitive;
export const TooltipArrow: import("@radix-ui/react-primitive").ExtendedPrimitive<PopperPrimitive.PopperArrowPrimitive, "svg">;
export const Root: React.FC<TooltipOwnProps>;
export const Trigger: TooltipTriggerPrimitive;
export const Content: TooltipContentPrimitive;
export const Arrow: import("@radix-ui/react-primitive").ExtendedPrimitive<PopperPrimitive.PopperArrowPrimitive, "svg">;

//# sourceMappingURL=index.d.ts.map
