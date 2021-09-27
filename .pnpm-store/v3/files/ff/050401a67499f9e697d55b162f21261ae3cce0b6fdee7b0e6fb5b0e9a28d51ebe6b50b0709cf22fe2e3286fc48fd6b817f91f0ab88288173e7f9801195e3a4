import { GraphQLSchema } from 'graphql';
import { SubschemaConfig, Transform, MergedTypeConfig, CreateProxyingResolverFn, BatchingOptions } from './types';
import { Executor, Subscriber } from '@graphql-tools/utils';
export declare function isSubschema(value: any): value is Subschema;
interface ISubschema<K = any, V = any, C = K, TContext = Record<string, any>> extends SubschemaConfig<K, V, C, TContext> {
    transformedSchema: GraphQLSchema;
}
export declare class Subschema<K = any, V = any, C = K, TContext = Record<string, any>> implements ISubschema<K, V, C, TContext> {
    schema: GraphQLSchema;
    rootValue?: Record<string, any>;
    executor?: Executor<TContext>;
    subscriber?: Subscriber<TContext>;
    batch?: boolean;
    batchingOptions?: BatchingOptions<K, V, C>;
    createProxyingResolver?: CreateProxyingResolverFn<TContext>;
    transforms: Array<Transform>;
    transformedSchema: GraphQLSchema;
    merge?: Record<string, MergedTypeConfig<any, any, TContext>>;
    constructor(config: SubschemaConfig<K, V, C, TContext>);
}
export {};
