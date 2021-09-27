import { ReactNode } from 'react';
import { EqualityChecker, UseStore } from 'zustand';
import { State, StateSelector } from './vanilla';
export interface UseContextStore<T extends State> {
    (): T;
    <U>(selector: StateSelector<T, U>, equalityFn?: EqualityChecker<U>): U;
}
declare function createContext<TState extends State>(): {
    Provider: ({ initialStore, createStore, children, }: {
        /**
         * @deprecated
         */
        initialStore?: UseStore<TState> | undefined;
        createStore: () => UseStore<TState>;
        children: ReactNode;
    }) => import("react").FunctionComponentElement<import("react").ProviderProps<UseStore<TState> | undefined>>;
    useStore: UseContextStore<TState>;
    useStoreApi: () => {
        getState: import("zustand").GetState<TState>;
        setState: import("zustand").SetState<TState>;
        subscribe: import("zustand").Subscribe<TState>;
        destroy: import("zustand").Destroy;
    };
};
export default createContext;
