import { AutocompleteStore } from './types';
interface GetAutocompleteSettersOptions<TItem> {
    store: AutocompleteStore<TItem>;
}
export declare function getAutocompleteSetters<TItem>({ store, }: GetAutocompleteSettersOptions<TItem>): {
    setHighlightedIndex: import("./types").StateUpdater<number | null>;
    setQuery: import("./types").StateUpdater<string>;
    setSuggestions: import("./types").StateUpdater<import("./types").AutocompleteSuggestion<TItem>[]>;
    setIsOpen: import("./types").StateUpdater<boolean>;
    setStatus: import("./types").StateUpdater<"idle" | "loading" | "stalled" | "error">;
    setContext: import("./types").StateUpdater<{
        [key: string]: unknown;
    }>;
};
export {};
