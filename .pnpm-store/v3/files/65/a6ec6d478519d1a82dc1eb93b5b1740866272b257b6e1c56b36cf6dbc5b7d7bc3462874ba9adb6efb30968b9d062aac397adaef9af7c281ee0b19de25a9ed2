/// <reference types="react" />
import { LevaRootProps } from './LevaRoot';
declare type LevaProps = Omit<Partial<LevaRootProps>, 'store'> & {
    isRoot?: boolean;
};
export declare function Leva({ isRoot, ...props }: LevaProps): JSX.Element;
/**
 * This hook is used by Leva useControls, and ensures that we spawn a Leva Panel
 * without the user having to put it into the component tree. This should only
 * happen when using the global store
 * @param isGlobalPanel
 */
export declare function useRenderRoot(isGlobalPanel: boolean): void;
export {};
