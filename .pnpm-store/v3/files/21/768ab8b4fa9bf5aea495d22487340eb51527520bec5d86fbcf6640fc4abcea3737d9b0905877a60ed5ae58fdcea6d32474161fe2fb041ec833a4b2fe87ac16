import { Id } from '../types';
export declare const enum ActionType {
    ADD = 0,
    REMOVE = 1
}
export declare type State = Array<Id>;
export declare type Action = {
    type: ActionType.ADD;
    toastId: Id;
    staleId?: Id;
} | {
    type: ActionType.REMOVE;
    toastId?: Id;
};
export declare function reducer(state: State, action: Action): Id[];
