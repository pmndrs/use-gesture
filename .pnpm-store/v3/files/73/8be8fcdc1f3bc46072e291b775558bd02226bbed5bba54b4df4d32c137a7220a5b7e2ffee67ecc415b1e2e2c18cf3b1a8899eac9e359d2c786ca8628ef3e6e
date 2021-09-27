import { AutocompleteOptions, AutocompleteSource, AutocompleteState, GetSources, PublicAutocompleteOptions } from './types';
export declare const noop: () => void;
export declare function generateAutocompleteId(): string;
export declare function getItemsCount(state: AutocompleteState<any>): number;
export declare function isSpecialClick(event: MouseEvent): boolean;
export declare function normalizeGetSources<TItem>(getSources: PublicAutocompleteOptions<TItem>['getSources']): GetSources<TItem>;
export declare function getNextHighlightedIndex<TItem>(moveAmount: number, baseIndex: number | null, itemCount: number, defaultHighlightedIndex: AutocompleteOptions<TItem>['defaultHighlightedIndex']): number | null;
export declare function getHighlightedItem<TItem>({ state, }: {
    state: AutocompleteState<TItem>;
}): {
    item: TItem;
    itemValue: string;
    itemUrl: string | undefined;
    source: AutocompleteSource<TItem>;
} | null;
export declare function isOrContainsNode(parent: Node, child: Node): boolean;
