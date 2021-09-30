import * as React from 'react';
import { PropsWithChildren } from 'react';
/**
 * This context affects all new and existing `SpringValue` objects
 * created with the hook API or the renderprops API.
 */
export interface SpringContext {
    /** Pause all new and existing animations. */
    pause?: boolean;
    /** Force all new and existing animations to be immediate. */
    immediate?: boolean;
}
export declare const SpringContext: {
    ({ children, ...props }: PropsWithChildren<SpringContext>): JSX.Element;
    Provider: React.Provider<SpringContext>;
    Consumer: React.Consumer<SpringContext>;
};
