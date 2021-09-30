import { AutocompleteState } from './state';
export declare type StateUpdater<TState> = (value: TState) => void;
export interface AutocompleteSetters<TItem> {
    setHighlightedIndex: StateUpdater<AutocompleteState<TItem>['highlightedIndex']>;
    setQuery: StateUpdater<AutocompleteState<TItem>['query']>;
    setSuggestions: StateUpdater<AutocompleteState<TItem>['suggestions']>;
    setIsOpen: StateUpdater<AutocompleteState<TItem>['isOpen']>;
    setStatus: StateUpdater<AutocompleteState<TItem>['status']>;
    setContext: StateUpdater<AutocompleteState<TItem>['context']>;
}
