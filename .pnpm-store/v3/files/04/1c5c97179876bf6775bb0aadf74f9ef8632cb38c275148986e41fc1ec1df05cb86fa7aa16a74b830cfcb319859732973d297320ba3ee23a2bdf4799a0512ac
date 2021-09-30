import { Lookup } from '@react-spring/types';
import { AnimatableComponent } from './withAnimated';
import { Animated } from './Animated';
export interface HostConfig {
    /** Provide custom logic for native updates */
    applyAnimatedValues: (node: any, props: Lookup) => boolean | void;
    /** Wrap the `style` prop with an animated node */
    createAnimatedStyle: (style: Lookup) => Animated;
    /** Intercept props before they're passed to an animated component */
    getComponentProps: (props: Lookup) => typeof props;
}
declare type WithAnimated = {
    (Component: AnimatableComponent): any;
    [key: string]: any;
};
export declare const createHost: (components: {
    [key: string]: AnimatableComponent;
} | AnimatableComponent[], { applyAnimatedValues, createAnimatedStyle, getComponentProps, }?: Partial<HostConfig>) => {
    animated: WithAnimated;
};
export {};
