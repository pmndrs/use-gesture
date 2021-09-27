import { AutocompleteOptions, AutocompleteSetters, AutocompleteStore, GetDropdownProps, GetEnvironmentProps, GetFormProps, GetInputProps, GetItemProps, GetLabelProps, GetMenuProps, GetRootProps } from './types';
interface GetPropGettersOptions<TItem> extends AutocompleteSetters<TItem> {
    store: AutocompleteStore<TItem>;
    props: AutocompleteOptions<TItem>;
}
export declare function getPropGetters<TItem, TEvent, TMouseEvent, TKeyboardEvent>({ store, props, setHighlightedIndex, setQuery, setSuggestions, setIsOpen, setStatus, setContext, }: GetPropGettersOptions<TItem>): {
    getEnvironmentProps: GetEnvironmentProps;
    getRootProps: GetRootProps;
    getFormProps: GetFormProps<TEvent>;
    getLabelProps: GetLabelProps;
    getInputProps: GetInputProps<TEvent, TMouseEvent, TKeyboardEvent>;
    getDropdownProps: GetDropdownProps<TMouseEvent>;
    getMenuProps: GetMenuProps;
    getItemProps: GetItemProps<any, TMouseEvent>;
};
export {};
