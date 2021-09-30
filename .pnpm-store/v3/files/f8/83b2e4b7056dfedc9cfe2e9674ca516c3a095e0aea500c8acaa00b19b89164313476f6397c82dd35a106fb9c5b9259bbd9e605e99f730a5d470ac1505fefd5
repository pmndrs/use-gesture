import type { Plugin, CustomInput, InputWithSettings, InternalPlugin, StoreType, Data, LevaInputs, InputOptions } from './types';
export declare const Plugins: Record<string, Plugin<any, any, any>>;
export declare function getValueType({ value, ...settings }: any): string | undefined;
/**
 * Populates Schemas and Plugins singletons that are used globally.
 *
 * @param type
 * @param plugin
 */
export declare function register<Input, Value, InternalSettings, Settings>(type: LevaInputs, { schema, ...plugin }: InternalPlugin<Input, Value, Settings, InternalSettings>): void;
/**
 * helper function for types
 * @param plugin
 */
export declare function createInternalPlugin<Input, Value, InternalSettings, Settings>(plugin: InternalPlugin<Input, Value, InternalSettings, Settings>): InternalPlugin<Input, Value, InternalSettings, Settings>;
declare type PluginInput<Input> = Input extends object ? Input & InputOptions : Input;
/**
 * This function should be used by custom plugins. It is mostly used as a way
 * to properly type the input return value.
 *
 * @param plugin
 */
export declare function createPlugin<Input, Value, InternalSettings>(plugin: Plugin<Input, Value, InternalSettings>): (input?: PluginInput<Input> | undefined) => CustomInput<Value>;
export declare function normalize<V, Settings extends object = {}>(type: string, input: InputWithSettings<V, Settings>, path: string, data: Data): {
    value: any;
    settings?: any;
};
export declare function sanitize<Settings extends object | undefined>(type: string, value: any, settings: Settings, prevValue: any, path: string, store: StoreType): any;
export declare function format<Settings extends object>(type: string, value: any, settings?: Settings): any;
export {};
