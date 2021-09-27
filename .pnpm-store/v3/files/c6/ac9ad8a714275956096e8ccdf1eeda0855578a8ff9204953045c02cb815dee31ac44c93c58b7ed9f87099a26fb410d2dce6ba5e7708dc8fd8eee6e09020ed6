import { GraphQLSchema } from 'graphql';
import { Request, ExecutionResult } from '@graphql-tools/utils';
import { Transform, DelegationContext, SubschemaConfig } from '@graphql-tools/delegate';
import { FieldTransformer, FieldNodeTransformer, DataTransformer, ErrorsTransformer } from '../types';
export default class TransformCompositeFields implements Transform {
    private readonly fieldTransformer;
    private readonly fieldNodeTransformer;
    private readonly dataTransformer;
    private readonly errorsTransformer;
    private transformedSchema;
    private typeInfo;
    private mapping;
    private subscriptionTypeName;
    constructor(fieldTransformer: FieldTransformer, fieldNodeTransformer?: FieldNodeTransformer, dataTransformer?: DataTransformer, errorsTransformer?: ErrorsTransformer);
    transformSchema(originalWrappingSchema: GraphQLSchema, _subschemaConfig: SubschemaConfig, _transformedSchema?: GraphQLSchema): GraphQLSchema;
    transformRequest(originalRequest: Request, _delegationContext: DelegationContext, transformationContext: Record<string, any>): Request;
    transformResult(result: ExecutionResult, _delegationContext: DelegationContext, transformationContext: Record<string, any>): ExecutionResult;
    private transformDocument;
    private transformSelectionSet;
}
