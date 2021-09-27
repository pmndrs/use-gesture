import { GraphQLSchema } from 'graphql';
import { Request } from '@graphql-tools/utils';
import { Transform, DelegationContext, SubschemaConfig } from '@graphql-tools/delegate';
import { InputFieldTransformer, InputFieldNodeTransformer, InputObjectNodeTransformer } from '../types';
export default class TransformInputObjectFields implements Transform {
    private readonly inputFieldTransformer;
    private readonly inputFieldNodeTransformer;
    private readonly inputObjectNodeTransformer;
    private transformedSchema;
    private mapping;
    constructor(inputFieldTransformer: InputFieldTransformer, inputFieldNodeTransformer?: InputFieldNodeTransformer, inputObjectNodeTransformer?: InputObjectNodeTransformer);
    transformSchema(originalWrappingSchema: GraphQLSchema, _subschemaConfig: SubschemaConfig, _transformedSchema?: GraphQLSchema): GraphQLSchema;
    transformRequest(originalRequest: Request, delegationContext: DelegationContext, _transformationContext: Record<string, any>): Request;
    private transformDocument;
}
