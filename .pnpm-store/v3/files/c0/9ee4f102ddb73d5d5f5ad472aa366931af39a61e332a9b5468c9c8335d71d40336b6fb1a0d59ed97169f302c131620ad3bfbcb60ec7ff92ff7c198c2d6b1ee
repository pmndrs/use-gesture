export declare type PointerWithConfiguration<T = any> = {
    [key: string]: T;
};
/**
 * Configuration of each used extension
 */
export interface IExtensions {
    [name: string]: any;
}
/**
 * Multiple named projects
 */
export interface IGraphQLProjects {
    projects: {
        [name: string]: IGraphQLProject | IGraphQLProjectLegacy;
    };
}
/**
 * Structure of GraphQL Config
 */
export declare type IGraphQLConfig = IGraphQLProject | IGraphQLProjects | IGraphQLProjectLegacy;
/**
 * Legacy structure of GraphQL Config v2
 */
export interface IGraphQLProjectLegacy {
    schemaPath: string;
    includes?: string[];
    excludes?: string[];
    extensions?: {
        [name: string]: any;
    };
}
export declare type WithList<T> = T | T[];
export declare type ElementOf<TList> = TList extends Array<infer TElement> ? TElement : never;
export declare type SchemaPointer = WithList<string>;
export declare type SchemaPointerSingle = ElementOf<SchemaPointer>;
export declare type DocumentGlobPathPointer = string;
export declare type DocumentPointer = WithList<DocumentGlobPathPointer>;
/**
 * GraphQL Project
 */
export interface IGraphQLProject {
    schema: SchemaPointer;
    documents?: DocumentPointer;
    extensions?: IExtensions;
    include?: string | string[];
    exclude?: string | string[];
}
export interface GraphQLConfigResult {
    config: IGraphQLConfig;
    filepath: string;
}
//# sourceMappingURL=types.d.ts.map