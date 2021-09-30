import { Source, Loader } from '@graphql-tools/utils';
import { UnnormalizedTypeDefPointer, LoadTypedefsOptions as ToolsLoadTypedefsOptions, LoadSchemaOptions as ToolsLoadSchemaOptions } from '@graphql-tools/load';
import { GraphQLSchema, DocumentNode } from 'graphql';
import { MiddlewareFn } from './helpers/utils';
declare type Pointer = UnnormalizedTypeDefPointer | UnnormalizedTypeDefPointer[];
declare type LoadTypedefsOptions = Partial<ToolsLoadTypedefsOptions>;
declare type LoadSchemaOptions = Partial<ToolsLoadSchemaOptions>;
export declare type SchemaOutput = 'GraphQLSchema' | 'DocumentNode' | 'string';
export declare class LoadersRegistry {
    private _loaders;
    private _middlewares;
    private readonly cwd;
    constructor({ cwd }: {
        cwd: string;
    });
    register(loader: Loader): void;
    override(loaders: Loader[]): void;
    use(middleware: MiddlewareFn<DocumentNode>): void;
    loadTypeDefs(pointer: Pointer, options?: LoadTypedefsOptions): Promise<Source[]>;
    loadTypeDefsSync(pointer: Pointer, options?: LoadTypedefsOptions): Source[];
    loadDocuments(pointer: Pointer, options?: LoadTypedefsOptions): Promise<Source[]>;
    loadDocumentsSync(pointer: Pointer, options?: LoadTypedefsOptions): Source[];
    loadSchema(pointer: Pointer): Promise<GraphQLSchema>;
    loadSchema(pointer: Pointer, out: 'string', options?: LoadSchemaOptions): Promise<GraphQLSchema>;
    loadSchema(pointer: Pointer, out: 'DocumentNode', options?: LoadSchemaOptions): Promise<DocumentNode>;
    loadSchema(pointer: Pointer, out: 'GraphQLSchema', options?: LoadSchemaOptions): Promise<GraphQLSchema>;
    loadSchemaSync(pointer: Pointer): GraphQLSchema;
    loadSchemaSync(pointer: Pointer, out: 'string', options?: LoadSchemaOptions): GraphQLSchema;
    loadSchemaSync(pointer: Pointer, out: 'DocumentNode', options?: LoadSchemaOptions): DocumentNode;
    loadSchemaSync(pointer: Pointer, out: 'GraphQLSchema', options?: LoadSchemaOptions): GraphQLSchema;
    private createOptions;
    private transformSchemaSources;
    private castSchema;
}
export {};
//# sourceMappingURL=loaders.d.ts.map