import { GraphQLSchema } from 'graphql';
import { Request, FieldNodeMappers, ExecutionResult } from '@graphql-tools/utils';
import { Transform, DelegationContext, SubschemaConfig } from '@graphql-tools/delegate';
import { ObjectValueTransformerMap, ErrorsTransformer } from '../types';
export default class MapFields implements Transform {
    private fieldNodeTransformerMap;
    private objectValueTransformerMap?;
    private errorsTransformer?;
    private transformer;
    constructor(fieldNodeTransformerMap: FieldNodeMappers, objectValueTransformerMap?: ObjectValueTransformerMap, errorsTransformer?: ErrorsTransformer);
    transformSchema(originalWrappingSchema: GraphQLSchema, subschemaConfig: SubschemaConfig, transformedSchema?: GraphQLSchema): GraphQLSchema;
    transformRequest(originalRequest: Request, delegationContext: DelegationContext, transformationContext: Record<string, any>): Request;
    transformResult(originalResult: ExecutionResult, delegationContext: DelegationContext, transformationContext: Record<string, any>): ExecutionResult;
}
