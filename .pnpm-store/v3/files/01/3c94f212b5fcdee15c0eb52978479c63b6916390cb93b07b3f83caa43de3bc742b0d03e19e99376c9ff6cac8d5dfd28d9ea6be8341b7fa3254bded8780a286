import { AutocompleteOptions, AutocompleteSetters, AutocompleteState, AutocompleteStore } from './types';
interface OnInputParams<TItem> extends AutocompleteSetters<TItem> {
    query: string;
    store: AutocompleteStore<TItem>;
    props: AutocompleteOptions<TItem>;
    /**
     * The next partial state to apply after the function is called.
     *
     * This is useful when we call `onInput` in a different scenario than an
     * actual input. For example, we use `onInput` when we click on an item,
     * but we want to close the dropdown in that case.
     */
    nextState?: Partial<AutocompleteState<TItem>>;
}
export declare function onInput<TItem>({ query, store, props, setHighlightedIndex, setQuery, setSuggestions, setIsOpen, setStatus, setContext, nextState, }: OnInputParams<TItem>): Promise<void>;
export {};
