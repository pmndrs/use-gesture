import { GraphQLSchema } from 'graphql';
import { Request, ExecutionResult } from '@graphql-tools/utils';
import { Transform, DelegationContext, SubschemaConfig } from '@graphql-tools/delegate';
export default class RenameRootTypes implements Transform {
    private readonly renamer;
    private map;
    private reverseMap;
    constructor(renamer: (name: string) => string | undefined);
    transformSchema(originalWrappingSchema: GraphQLSchema, _subschemaConfig: SubschemaConfig, _transformedSchema?: GraphQLSchema): GraphQLSchema;
    transformRequest(originalRequest: Request, _delegationContext: DelegationContext, _transformationContext: Record<string, any>): Request;
    transformResult(originalResult: ExecutionResult, _delegationContext: DelegationContext, _transformationContext?: Record<string, any>): ExecutionResult;
}
