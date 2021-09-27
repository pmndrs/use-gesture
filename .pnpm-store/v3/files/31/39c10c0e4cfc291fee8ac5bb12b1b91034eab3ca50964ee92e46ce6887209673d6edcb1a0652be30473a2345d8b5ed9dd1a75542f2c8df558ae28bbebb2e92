import { GraphQLSchema } from 'graphql';
import { Request, ExecutionResult } from '@graphql-tools/utils';
import { Transform, DelegationContext, SubschemaConfig } from '@graphql-tools/delegate';
import { RootFieldTransformer, FieldNodeTransformer } from '../types';
export default class TransformRootFields implements Transform {
    private readonly rootFieldTransformer;
    private readonly fieldNodeTransformer;
    private transformer;
    constructor(rootFieldTransformer: RootFieldTransformer, fieldNodeTransformer?: FieldNodeTransformer);
    transformSchema(originalWrappingSchema: GraphQLSchema, subschemaConfig: SubschemaConfig, transformedSchema?: GraphQLSchema): GraphQLSchema;
    transformRequest(originalRequest: Request, delegationContext: DelegationContext, transformationContext: Record<string, any>): Request;
    transformResult(originalResult: ExecutionResult, delegationContext: DelegationContext, transformationContext: Record<string, any>): ExecutionResult;
}
