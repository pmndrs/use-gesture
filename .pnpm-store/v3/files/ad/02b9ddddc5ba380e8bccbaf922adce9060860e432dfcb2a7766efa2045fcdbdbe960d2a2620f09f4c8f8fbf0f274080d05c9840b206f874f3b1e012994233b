import { Valid } from '../types/common';
import { PickAnimated, SpringValues } from '../types';
import { UseSpringProps } from './useSpring';
import { SpringRef } from '../SpringRef';
import { Controller } from '../Controller';
export declare type UseTrailProps<Props extends object = any> = UseSpringProps<Props>;
export declare function useTrail<Props extends object>(length: number, props: (i: number, ctrl: Controller) => UseTrailProps | (Props & Valid<Props, UseTrailProps<Props>>), deps?: readonly any[]): PickAnimated<Props> extends infer State ? [SpringValues<State>[], SpringRef<State>] : never;
export declare function useTrail<Props extends object>(length: number, props: UseTrailProps | (Props & Valid<Props, UseTrailProps<Props>>)): SpringValues<PickAnimated<Props>>[];
export declare function useTrail<Props extends object>(length: number, props: UseTrailProps | (Props & Valid<Props, UseTrailProps<Props>>), deps: readonly any[]): PickAnimated<Props> extends infer State ? [SpringValues<State>[], SpringRef<State>] : never;
