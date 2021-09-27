declare type ParseAttributeParams = {
    highlightPreTag?: string;
    highlightPostTag?: string;
    highlightedValue: string;
};
declare type ParsedAttribute = {
    value: string;
    isHighlighted: boolean;
};
export declare function parseAttribute({ highlightPreTag, highlightPostTag, highlightedValue, }: ParseAttributeParams): ParsedAttribute[];
declare type SharedParseAttributeParams = {
    hit: any;
    attribute: string;
    highlightPreTag?: string;
    highlightPostTag?: string;
};
export declare function parseHighlightedAttribute({ hit, attribute, highlightPreTag, highlightPostTag, }: SharedParseAttributeParams): ParsedAttribute[];
export declare function parseReverseHighlightedAttribute({ hit, attribute, highlightPreTag, highlightPostTag, }: SharedParseAttributeParams): ParsedAttribute[];
export declare function parseSnippetedAttribute({ hit, attribute, highlightPreTag, highlightPostTag, }: SharedParseAttributeParams): ParsedAttribute[];
export {};
