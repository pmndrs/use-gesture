/// <reference types="react" />
import { NoInfer, UnknownProps } from '@react-spring/types';
import { UseSpringProps } from '../hooks/useSpring';
import { SpringValues, SpringToFn, SpringChain } from '../types';
export declare type SpringComponentProps<State extends object = UnknownProps> = unknown & UseSpringProps<State> & {
    children: (values: SpringValues<State>) => JSX.Element | null;
};
export declare function Spring<State extends object>(props: {
    from: State;
    to?: SpringChain<NoInfer<State>> | SpringToFn<NoInfer<State>>;
} & Omit<SpringComponentProps<NoInfer<State>>, 'from' | 'to'>): JSX.Element | null;
export declare function Spring<State extends object>(props: {
    to: State;
} & Omit<SpringComponentProps<NoInfer<State>>, 'to'>): JSX.Element | null;
