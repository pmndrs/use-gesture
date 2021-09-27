import { GraphQLSchema, ExecutionResult } from 'graphql';
import { Request } from '@graphql-tools/utils';
import { Transform, DelegationContext, SubschemaConfig } from '@graphql-tools/delegate';
import { EnumValueTransformer, LeafValueTransformer } from '../types';
import { MapLeafValuesTransformationContext } from './MapLeafValues';
export default class TransformEnumValues implements Transform<MapLeafValuesTransformationContext> {
    private readonly enumValueTransformer;
    private readonly transformer;
    private transformedSchema;
    private mapping;
    private reverseMapping;
    constructor(enumValueTransformer: EnumValueTransformer, inputValueTransformer?: LeafValueTransformer, outputValueTransformer?: LeafValueTransformer);
    transformSchema(originalWrappingSchema: GraphQLSchema, subschemaConfig: SubschemaConfig, transformedSchema?: GraphQLSchema): GraphQLSchema;
    transformRequest(originalRequest: Request, delegationContext: DelegationContext, transformationContext: MapLeafValuesTransformationContext): Request;
    transformResult(originalResult: ExecutionResult, delegationContext: DelegationContext, transformationContext: MapLeafValuesTransformationContext): import("@graphql-tools/utils").ExecutionResult<Record<string, any>>;
    private transformEnumValue;
}
