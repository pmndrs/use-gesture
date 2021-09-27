import { GraphQLSchema } from 'graphql';
import { Request, ExecutionResult } from '@graphql-tools/utils';
import { Transform, DelegationContext, SubschemaConfig } from '@graphql-tools/delegate';
import { LeafValueTransformer } from '../types';
export interface MapLeafValuesTransformationContext {
    transformedRequest: Request;
}
export default class MapLeafValues implements Transform<MapLeafValuesTransformationContext> {
    private readonly inputValueTransformer;
    private readonly outputValueTransformer;
    private readonly resultVisitorMap;
    private originalWrappingSchema;
    private typeInfo;
    constructor(inputValueTransformer: LeafValueTransformer, outputValueTransformer: LeafValueTransformer);
    transformSchema(originalWrappingSchema: GraphQLSchema, _subschemaConfig: SubschemaConfig, _transformedSchema?: GraphQLSchema): GraphQLSchema;
    transformRequest(originalRequest: Request, _delegationContext: DelegationContext, transformationContext?: MapLeafValuesTransformationContext): Request;
    transformResult(originalResult: ExecutionResult, _delegationContext: DelegationContext, transformationContext?: MapLeafValuesTransformationContext): ExecutionResult;
    private transformOperations;
    private transformFieldNode;
}
