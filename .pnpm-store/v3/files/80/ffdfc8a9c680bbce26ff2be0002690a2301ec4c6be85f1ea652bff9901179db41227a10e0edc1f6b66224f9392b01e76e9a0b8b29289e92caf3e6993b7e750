declare type ParameterType = 'Boolean' | 'Symbol' | 'Number' | 'Enum';
declare type ParameterOption = string | {
    [key: string]: string;
};
export interface ParameterDefinition {
    name: string;
    id: string;
    description?: string;
    type: ParameterType;
    required?: boolean;
    default?: boolean | string | number;
    options?: ParameterOption[];
    labels?: {
        empty?: string;
        true?: string;
        false?: string;
    };
}
export declare type DefinedParameters = Record<string, string | number | boolean>;
export declare type FreeFormParameters = Record<string, any> | Array<any> | number | string | boolean;
export {};
