import { AutocompleteOptions } from './api';
import { AutocompleteState } from './state';
export interface AutocompleteStore<TItem> {
    state: AutocompleteState<TItem>;
    getState(): AutocompleteState<TItem>;
    send(action: ActionType, payload: any): void;
}
export declare type Reducer = <TItem>(action: Action, state: AutocompleteState<TItem>, props: AutocompleteOptions<TItem>) => AutocompleteState<TItem>;
declare type Action = {
    type: ActionType;
    value: any;
};
declare type ActionType = 'setHighlightedIndex' | 'setQuery' | 'setSuggestions' | 'setIsOpen' | 'setStatus' | 'setContext' | 'ArrowUp' | 'ArrowDown' | 'Escape' | 'Enter' | 'submit' | 'reset' | 'focus' | 'blur' | 'mousemove' | 'mouseleave' | 'click';
export {};
