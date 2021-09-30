import * as React from "react";
declare type KeyMap = {
    [key: string]: ((event: React.KeyboardEvent<any>) => any) | null | false | undefined;
};
declare type Options = {
    keyMap?: KeyMap | ((event: React.KeyboardEvent) => KeyMap);
    onKey?: (event: React.KeyboardEvent) => any;
    preventDefault?: boolean | ((event: React.KeyboardEvent) => boolean);
    stopPropagation?: boolean | ((event: React.KeyboardEvent) => boolean);
    shouldKeyDown?: (event: React.KeyboardEvent) => boolean;
    onKeyDown?: React.KeyboardEventHandler | React.RefObject<React.KeyboardEventHandler | undefined>;
};
/**
 * Returns an `onKeyDown` handler to be passed to a component.
 *
 * @param options
 */
export declare function createOnKeyDown({ keyMap, onKey, stopPropagation, onKeyDown, shouldKeyDown, preventDefault, }?: Options): React.KeyboardEventHandler;
export {};
