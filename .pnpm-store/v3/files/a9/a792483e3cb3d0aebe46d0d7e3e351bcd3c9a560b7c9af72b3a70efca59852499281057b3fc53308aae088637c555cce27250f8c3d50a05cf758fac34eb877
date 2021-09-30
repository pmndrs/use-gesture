import { ReactNode } from 'react';
import { UseStore } from 'zustand';
import { EqualityChecker, State, StateSelector } from './vanilla';
declare function createContext<TState extends State>(): {
    Provider: ({ initialStore, createStore, children, }: {
        createStore: () => UseStore<TState>;
        children: ReactNode;
    }) => import("react").FunctionComponentElement<import("react").ProviderProps<UseStore<TState> | undefined>>;
    useStore: <StateSlice>(selector?: StateSelector<TState, StateSlice> | undefined, equalityFn?: EqualityChecker<StateSlice>) => StateSlice;
    useStoreApi: () => {
        getState: import("zustand").GetState<TState>;
        setState: import("zustand").SetState<TState>;
        subscribe: import("zustand").Subscribe<TState>;
        destroy: import("zustand").Destroy;
    };
};
export default createContext;
