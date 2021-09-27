import { GraphQLSchema } from 'graphql';
import { Request, InputFieldFilter } from '@graphql-tools/utils';
import { Transform, DelegationContext, SubschemaConfig } from '@graphql-tools/delegate';
import { InputObjectNodeTransformer } from '../types';
export default class FilterInputObjectFields implements Transform {
    private readonly transformer;
    constructor(filter: InputFieldFilter, inputObjectNodeTransformer?: InputObjectNodeTransformer);
    transformSchema(originalWrappingSchema: GraphQLSchema, subschemaConfig: SubschemaConfig, transformedSchema?: GraphQLSchema): GraphQLSchema;
    transformRequest(originalRequest: Request, delegationContext: DelegationContext, transformationContext: Record<string, any>): Request;
}
