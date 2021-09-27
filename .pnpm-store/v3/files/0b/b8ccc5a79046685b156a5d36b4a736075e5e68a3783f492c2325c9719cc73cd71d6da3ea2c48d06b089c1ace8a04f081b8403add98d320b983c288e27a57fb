export declare type State = object;
export declare type PartialState<T extends State, K1 extends keyof T = keyof T, K2 extends keyof T = K1, K3 extends keyof T = K2, K4 extends keyof T = K3> = (Pick<T, K1> | Pick<T, K2> | Pick<T, K3> | Pick<T, K4> | T) | ((state: T) => Pick<T, K1> | Pick<T, K2> | Pick<T, K3> | Pick<T, K4> | T);
export declare type StateSelector<T extends State, U> = (state: T) => U;
export declare type EqualityChecker<T> = (state: T, newState: T) => boolean;
export declare type StateListener<T> = (state: T, previousState: T) => void;
export declare type StateSliceListener<T> = (slice: T, previousSlice: T) => void;
export interface Subscribe<T extends State> {
    (listener: StateListener<T>): () => void;
    <StateSlice>(listener: StateSliceListener<StateSlice>, selector?: StateSelector<T, StateSlice>, equalityFn?: EqualityChecker<StateSlice>): () => void;
}
export declare type SetState<T extends State> = {
    <K1 extends keyof T, K2 extends keyof T = K1, K3 extends keyof T = K2, K4 extends keyof T = K3>(partial: PartialState<T, K1, K2, K3, K4>, replace?: boolean): void;
};
export declare type GetState<T extends State> = () => T;
export declare type Destroy = () => void;
export interface StoreApi<T extends State> {
    setState: SetState<T>;
    getState: GetState<T>;
    subscribe: Subscribe<T>;
    destroy: Destroy;
}
export declare type StateCreator<T extends State, CustomSetState = SetState<T>> = (set: CustomSetState, get: GetState<T>, api: StoreApi<T>) => T;
export default function create<TState extends State>(createState: StateCreator<TState>): StoreApi<TState>;
