import { GraphQLSchema } from 'graphql';
import { Request, ExecutionResult } from '@graphql-tools/utils';
import { Transform, DelegationContext, SubschemaConfig } from '@graphql-tools/delegate';
import { FieldTransformer, FieldNodeTransformer } from '../types';
export default class TransformInterfaceFields implements Transform {
    private readonly interfaceFieldTransformer;
    private readonly fieldNodeTransformer;
    private transformer;
    constructor(interfaceFieldTransformer: FieldTransformer, fieldNodeTransformer?: FieldNodeTransformer);
    transformSchema(originalWrappingSchema: GraphQLSchema, subschemaConfig: SubschemaConfig, transformedSchema?: GraphQLSchema): GraphQLSchema;
    transformRequest(originalRequest: Request, delegationContext: DelegationContext, transformationContext: Record<string, any>): Request;
    transformResult(originalResult: ExecutionResult, delegationContext: DelegationContext, transformationContext: Record<string, any>): ExecutionResult;
}
