import { CommonOptions, Data, DataInput, DataInputOptions, PanelInputOptions, StoreType } from '../types';
declare type ParsedOptions = {
    type?: string;
    input: any;
    options: CommonOptions | DataInputOptions | PanelInputOptions;
};
export declare function parseOptions(_input: any, key: string, mergedOptions?: {}, customType?: string): ParsedOptions;
/**
 * This function is used to normalize the way an input is stored in the store.
 * Returns a value in the form of { type, value, settings} by doing different
 * checks depending on the input structure.
 *
 * @param input
 * @param path
 */
export declare function normalizeInput(_input: any, key: string, path: string, data: Data): false | ParsedOptions;
export declare function updateInput(input: DataInput, newValue: any, path: string, store: StoreType, fromPanel: boolean): void;
declare type SanitizeProps = {
    type: string;
    value: any;
    settings: object | undefined;
};
export declare function sanitizeValue({ type, value, settings }: SanitizeProps, newValue: any, path: string, store: StoreType): any;
export {};
