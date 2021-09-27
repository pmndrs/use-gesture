import { AutocompleteSource } from './api';
export interface AutocompleteAccessibilityGetters<TItem, TEvent = Event, TMouseEvent = MouseEvent, TKeyboardEvent = KeyboardEvent> {
    getEnvironmentProps: GetEnvironmentProps;
    getRootProps: GetRootProps;
    getFormProps: GetFormProps<TEvent>;
    getLabelProps: GetLabelProps;
    getInputProps: GetInputProps<TEvent, TMouseEvent, TKeyboardEvent>;
    getDropdownProps: GetDropdownProps<TMouseEvent>;
    getMenuProps: GetMenuProps;
    getItemProps: GetItemProps<TItem, TMouseEvent>;
}
export declare type GetEnvironmentProps = (props: {
    [key: string]: unknown;
    searchBoxElement: HTMLElement;
    dropdownElement: HTMLElement;
    inputElement: HTMLInputElement;
}) => {
    onTouchStart(event: TouchEvent): void;
    onTouchMove(event: TouchEvent): void;
};
export declare type GetRootProps = (props?: {
    [key: string]: unknown;
}) => {
    role: string;
    'aria-expanded': boolean;
    'aria-haspopup': boolean | 'dialog' | 'menu' | 'true' | 'false' | 'grid' | 'listbox' | 'tree' | undefined;
    'aria-owns': string | undefined;
    'aria-labelledby': string;
};
export declare type GetFormProps<TEvent = Event> = (props: {
    [key: string]: unknown;
    inputElement: HTMLInputElement | null;
}) => {
    action: '';
    noValidate: true;
    role: 'search';
    onSubmit(event: TEvent): void;
    onReset(event: TEvent): void;
};
export declare type GetLabelProps = (props?: {
    [key: string]: unknown;
}) => {
    htmlFor: string;
    id: string;
};
export declare type GetInputProps<TEvent, TMouseEvent, TKeyboardEvent> = (props: {
    [key: string]: unknown;
    inputElement: HTMLInputElement;
    maxLength?: number;
}) => {
    id: string;
    value: string;
    autoFocus: boolean;
    placeholder: string;
    autoComplete: 'on' | 'off';
    autoCorrect: 'on' | 'off';
    autoCapitalize: 'on' | 'off';
    spellCheck: 'false';
    maxLength: number;
    type: 'search';
    'aria-autocomplete': 'none' | 'inline' | 'list' | 'both';
    'aria-activedescendant': string | undefined;
    'aria-controls': string | undefined;
    'aria-labelledby': string;
    onChange(event: TEvent): void;
    onKeyDown(event: TKeyboardEvent): void;
    onFocus(): void;
    onBlur(): void;
    onClick(event: TMouseEvent): void;
};
export declare type GetDropdownProps<TMouseEvent> = (props?: {
    [key: string]: unknown;
}) => {
    onMouseDown(event: TMouseEvent): void;
    onMouseLeave(): void;
};
export declare type GetMenuProps = (props?: {
    [key: string]: unknown;
}) => {
    role: string;
    'aria-labelledby': string;
    id: string;
};
export declare type GetItemProps<TItem, TMouseEvent = MouseEvent> = (props: {
    [key: string]: unknown;
    item: TItem;
    source: AutocompleteSource<TItem>;
}) => {
    id: string;
    role: string;
    'aria-selected': boolean;
    onMouseMove(event: TMouseEvent): void;
    onMouseDown(event: TMouseEvent): void;
    onClick(event: TMouseEvent): void;
};
