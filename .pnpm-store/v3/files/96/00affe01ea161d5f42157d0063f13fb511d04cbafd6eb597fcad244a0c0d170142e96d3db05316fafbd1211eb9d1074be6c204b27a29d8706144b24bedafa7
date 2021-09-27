import { GraphQLSchema, GraphQLOutputType, SelectionSetNode, FieldNode, GraphQLResolveInfo, GraphQLFieldResolver, FragmentDefinitionNode, GraphQLObjectType, VariableDefinitionNode, OperationTypeNode, GraphQLError } from 'graphql';
import DataLoader from 'dataloader';
import { ExecutionParams, ExecutionResult, Executor, Request, Subscriber, TypeMap } from '@graphql-tools/utils';
import { Subschema } from './Subschema';
import { OBJECT_SUBSCHEMA_SYMBOL, FIELD_SUBSCHEMA_MAP_SYMBOL, UNPATHED_ERRORS_SYMBOL } from './symbols';
export declare type SchemaTransform = (originalWrappingSchema: GraphQLSchema, subschemaConfig: SubschemaConfig, transformedSchema?: GraphQLSchema) => GraphQLSchema;
export declare type RequestTransform<T = Record<string, any>> = (originalRequest: Request, delegationContext: DelegationContext, transformationContext: T) => Request;
export declare type ResultTransform<T = Record<string, any>> = (originalResult: ExecutionResult, delegationContext: DelegationContext, transformationContext: T) => ExecutionResult;
export interface Transform<T = Record<string, any>> {
    transformSchema?: SchemaTransform;
    transformRequest?: RequestTransform<T>;
    transformResult?: ResultTransform<T>;
}
export interface DelegationContext {
    subschema: GraphQLSchema | SubschemaConfig;
    targetSchema: GraphQLSchema;
    operation: OperationTypeNode;
    fieldName: string;
    args: Record<string, any>;
    context: Record<string, any>;
    info: GraphQLResolveInfo;
    returnType: GraphQLOutputType;
    onLocatedError?: (originalError: GraphQLError) => GraphQLError;
    transforms: Array<Transform>;
    transformedSchema: GraphQLSchema;
    skipTypeMerging: boolean;
}
export declare type DelegationBinding = (delegationContext: DelegationContext) => Array<Transform>;
export interface IDelegateToSchemaOptions<TContext = Record<string, any>, TArgs = Record<string, any>> {
    schema: GraphQLSchema | SubschemaConfig<any, any, any, TContext>;
    operationName?: string;
    operation?: OperationTypeNode;
    fieldName?: string;
    returnType?: GraphQLOutputType;
    onLocatedError?: (originalError: GraphQLError) => GraphQLError;
    args?: TArgs;
    selectionSet?: SelectionSetNode;
    fieldNodes?: ReadonlyArray<FieldNode>;
    context?: TContext;
    info: GraphQLResolveInfo;
    rootValue?: Record<string, any>;
    transforms?: Array<Transform>;
    transformedSchema?: GraphQLSchema;
    skipValidation?: boolean;
    skipTypeMerging?: boolean;
    binding?: DelegationBinding;
}
export interface IDelegateRequestOptions<TContext = Record<string, any>, TArgs = Record<string, any>> extends Omit<IDelegateToSchemaOptions<TContext, TArgs>, 'info'> {
    request: Request;
    info?: GraphQLResolveInfo;
}
export interface ICreateRequestFromInfo {
    info: GraphQLResolveInfo;
    operationName?: string;
    operation: OperationTypeNode;
    fieldName: string;
    selectionSet?: SelectionSetNode;
    fieldNodes?: ReadonlyArray<FieldNode>;
}
export interface ICreateRequest {
    sourceSchema?: GraphQLSchema;
    sourceParentType?: GraphQLObjectType;
    sourceFieldName?: string;
    fragments?: Record<string, FragmentDefinitionNode>;
    variableDefinitions?: ReadonlyArray<VariableDefinitionNode>;
    variableValues?: Record<string, any>;
    targetOperation: OperationTypeNode;
    targetOperationName?: string;
    targetFieldName: string;
    selectionSet?: SelectionSetNode;
    fieldNodes?: ReadonlyArray<FieldNode>;
}
export interface MergedTypeInfo<TContext = Record<string, any>> {
    typeName: string;
    selectionSet?: SelectionSetNode;
    targetSubschemas: Map<Subschema, Array<Subschema>>;
    uniqueFields: Record<string, Subschema>;
    nonUniqueFields: Record<string, Array<Subschema>>;
    typeMaps: Map<GraphQLSchema | SubschemaConfig, TypeMap>;
    selectionSets: Map<Subschema, SelectionSetNode>;
    fieldSelectionSets: Map<Subschema, Record<string, SelectionSetNode>>;
    resolvers: Map<Subschema, MergedTypeResolver<TContext>>;
}
export interface ICreateProxyingResolverOptions<TContext = Record<string, any>> {
    subschemaConfig: SubschemaConfig<any, any, any, TContext>;
    transformedSchema?: GraphQLSchema;
    operation?: OperationTypeNode;
    fieldName?: string;
}
export declare type CreateProxyingResolverFn<TContext = Record<string, any>> = (options: ICreateProxyingResolverOptions<TContext>) => GraphQLFieldResolver<any, TContext>;
export interface BatchingOptions<K = any, V = any, C = K> {
    extensionsReducer?: (mergedExtensions: Record<string, any>, executionParams: ExecutionParams) => Record<string, any>;
    dataLoaderOptions?: DataLoader.Options<K, V, C>;
}
export interface SubschemaConfig<K = any, V = any, C = K, TContext = Record<string, any>> {
    schema: GraphQLSchema;
    createProxyingResolver?: CreateProxyingResolverFn<TContext>;
    transforms?: Array<Transform>;
    merge?: Record<string, MergedTypeConfig<any, any, TContext>>;
    rootValue?: Record<string, any>;
    executor?: Executor<TContext>;
    subscriber?: Subscriber<TContext>;
    batch?: boolean;
    batchingOptions?: BatchingOptions<K, V, C>;
}
export interface MergedTypeConfig<K = any, V = any, TContext = Record<string, any>> extends MergedTypeEntryPoint<K, V, TContext> {
    entryPoints?: Array<MergedTypeEntryPoint>;
    fields?: Record<string, MergedFieldConfig>;
    computedFields?: Record<string, {
        selectionSet?: string;
    }>;
    canonical?: boolean;
}
export interface MergedTypeEntryPoint<K = any, V = any, TContext = Record<string, any>> extends MergedTypeResolverOptions<K, V> {
    selectionSet?: string;
    key?: (originalResult: any) => K;
    resolve?: MergedTypeResolver<TContext>;
}
export interface MergedTypeResolverOptions<K = any, V = any> {
    fieldName?: string;
    args?: (originalResult: any) => Record<string, any>;
    argsFromKeys?: (keys: ReadonlyArray<K>) => Record<string, any>;
    valuesFromResults?: (results: any, keys: ReadonlyArray<K>) => Array<V>;
}
export interface MergedFieldConfig {
    selectionSet?: string;
    computed?: boolean;
    canonical?: boolean;
}
export declare type MergedTypeResolver<TContext = Record<string, any>> = (originalResult: any, context: TContext, info: GraphQLResolveInfo, subschema: GraphQLSchema | SubschemaConfig<any, any, any, TContext>, selectionSet: SelectionSetNode, key?: any) => any;
export interface StitchingInfo<TContext = Record<string, any>> {
    subschemaMap: Map<GraphQLSchema | SubschemaConfig<any, any, any, TContext>, Subschema<any, any, any, TContext>>;
    selectionSetsByType: Record<string, SelectionSetNode>;
    selectionSetsByField: Record<string, Record<string, SelectionSetNode>>;
    dynamicSelectionSetsByField: Record<string, Record<string, Array<(node: FieldNode) => SelectionSetNode>>>;
    mergedTypes: Record<string, MergedTypeInfo<TContext>>;
}
export interface ExternalObject<TContext = Record<string, any>> {
    key: any;
    [OBJECT_SUBSCHEMA_SYMBOL]: GraphQLSchema | SubschemaConfig<any, any, any, TContext>;
    [FIELD_SUBSCHEMA_MAP_SYMBOL]: Record<string, GraphQLSchema | SubschemaConfig<any, any, any, TContext>>;
    [UNPATHED_ERRORS_SYMBOL]: Array<GraphQLError>;
}
