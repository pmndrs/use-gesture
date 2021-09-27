import { OneOrMore } from '@react-spring/types';
import { PickAnimated, TransitionFn, UseTransitionProps } from '../types';
import { Valid } from '../types/common';
import type { SpringRef as SpringRefType } from '../SpringRef';
export declare function useTransition<Item, Props extends object>(data: OneOrMore<Item>, props: () => UseTransitionProps<Item> | (Props & Valid<Props, UseTransitionProps<Item>>), deps?: any[]): PickAnimated<Props> extends infer State ? [TransitionFn<Item, PickAnimated<Props>>, SpringRefType<State>] : never;
export declare function useTransition<Item, Props extends object>(data: OneOrMore<Item>, props: UseTransitionProps<Item> | (Props & Valid<Props, UseTransitionProps<Item>>)): TransitionFn<Item, PickAnimated<Props>>;
export declare function useTransition<Item, Props extends object>(data: OneOrMore<Item>, props: UseTransitionProps<Item> | (Props & Valid<Props, UseTransitionProps<Item>>), deps: any[] | undefined): PickAnimated<Props> extends infer State ? [TransitionFn<Item, State>, SpringRefType<State>] : never;
