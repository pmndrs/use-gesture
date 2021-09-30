import { GraphQLSchema } from 'graphql';
import { Request, ExecutionResult } from '@graphql-tools/utils';
import { Transform, DelegationContext, SubschemaConfig } from '@graphql-tools/delegate';
export default class WrapType implements Transform {
    private readonly transformer;
    constructor(outerTypeName: string, innerTypeName: string, fieldName: string);
    transformSchema(originalWrappingSchema: GraphQLSchema, subschemaConfig: SubschemaConfig, transformedSchema?: GraphQLSchema): GraphQLSchema;
    transformRequest(originalRequest: Request, delegationContext: DelegationContext, transformationContext: Record<string, any>): Request;
    transformResult(originalResult: ExecutionResult, delegationContext: DelegationContext, transformationContext: Record<string, any>): ExecutionResult;
}
