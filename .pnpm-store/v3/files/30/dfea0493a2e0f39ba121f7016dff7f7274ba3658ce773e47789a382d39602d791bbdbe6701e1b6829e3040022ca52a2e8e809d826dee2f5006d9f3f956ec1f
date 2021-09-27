/// <reference types="react" />
import type { FolderSettings, Schema, SchemaToValues, StoreType } from './types';
declare type HookSettings = {
    store?: StoreType;
};
declare type SchemaOrFn<S extends Schema = Schema> = S | (() => S);
declare type FunctionReturnType<S extends Schema> = [
    SchemaToValues<S>,
    (value: {
        [K in keyof Partial<SchemaToValues<S, true>>]: any;
    }) => void
];
declare type ReturnType<F extends SchemaOrFn> = F extends SchemaOrFn<infer S> ? F extends Function ? FunctionReturnType<S> : SchemaToValues<S> : never;
declare type HookReturnType<F extends SchemaOrFn | string, G extends SchemaOrFn> = F extends SchemaOrFn ? ReturnType<F> : ReturnType<G>;
/**
 *
 * @param schemaOrFolderName
 * @param settingsOrDepsOrSchema
 * @param folderSettingsOrDeps
 * @param depsOrUndefined
 */
export declare function useControls<S extends Schema, F extends SchemaOrFn<S> | string, G extends SchemaOrFn<S>>(schemaOrFolderName: F, settingsOrDepsOrSchema?: HookSettings | React.DependencyList | G, depsOrSettingsOrFolderSettings?: React.DependencyList | HookSettings | FolderSettings, depsOrSettings?: React.DependencyList | HookSettings, depsOrUndefined?: React.DependencyList): HookReturnType<F, G>;
export {};
