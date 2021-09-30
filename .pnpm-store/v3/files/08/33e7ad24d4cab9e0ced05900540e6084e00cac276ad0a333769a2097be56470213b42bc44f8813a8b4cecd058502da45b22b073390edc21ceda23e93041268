import { GraphQLEnumType, GraphQLInputObjectType, GraphQLNamedType, GraphQLScalarType } from 'graphql';
export interface SchemaPrintOptions {
    /**
     * Descriptions are defined as preceding string literals, however an older
     * experimental version of the SDL supported preceding comments as
     * descriptions. Set to true to enable this deprecated behavior.
     * This option is provided to ease adoption and will be removed in v16.
     *
     * Default: false
     */
    commentDescriptions?: boolean;
}
export interface GetDocumentNodeFromSchemaOptions {
    pathToDirectivesInExtensions?: Array<string>;
}
export declare type PrintSchemaWithDirectivesOptions = SchemaPrintOptions & GetDocumentNodeFromSchemaOptions;
export declare type Maybe<T> = null | undefined | T;
export declare type Constructor<T> = new (...args: any[]) => T;
export declare type PruneSchemaFilter = (type: GraphQLNamedType) => boolean;
/**
 * Options for removing unused types from the schema
 */
export interface PruneSchemaOptions {
    /**
     * Return true to skip pruning this type. This check will run first before any other options.
     * This can be helpful for schemas that support type extensions like Apollo Federation.
     */
    skipPruning?: PruneSchemaFilter;
    /**
     * Set to `true` to skip pruning object types or interfaces with no no fields
     */
    skipEmptyCompositeTypePruning?: boolean;
    /**
     * Set to `true` to skip pruning interfaces that are not implemented by any
     * other types
     */
    skipUnimplementedInterfacesPruning?: boolean;
    /**
     * Set to `true` to skip pruning empty unions
     */
    skipEmptyUnionPruning?: boolean;
    /**
     * Set to `true` to skip pruning unused types
     */
    skipUnusedTypesPruning?: boolean;
}
export declare type InputLeafValueTransformer = (type: GraphQLEnumType | GraphQLScalarType, originalValue: any) => any;
export declare type InputObjectValueTransformer = (type: GraphQLInputObjectType, originalValue: Record<string, any>) => Record<string, any>;
