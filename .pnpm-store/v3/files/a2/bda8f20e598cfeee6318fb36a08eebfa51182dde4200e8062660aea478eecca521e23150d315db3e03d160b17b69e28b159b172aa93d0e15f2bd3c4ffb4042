import { GraphQLSchema, IntrospectionOptions } from 'graphql';
import { AsyncExecutor, SyncExecutor } from '@graphql-tools/utils';
export declare function introspectSchema<TExecutor extends AsyncExecutor | SyncExecutor>(executor: TExecutor, context?: Record<string, any>, options?: IntrospectionOptions): TExecutor extends AsyncExecutor ? Promise<GraphQLSchema> : GraphQLSchema;
export declare function introspectSchemaSync(executor: SyncExecutor, context?: Record<string, any>, options?: IntrospectionOptions): GraphQLSchema;
