import { GraphQLSchema, GraphQLInputFieldConfig } from 'graphql';
import { Request } from '@graphql-tools/utils';
import { Transform, DelegationContext, SubschemaConfig } from '@graphql-tools/delegate';
export default class RenameInputObjectFields implements Transform {
    private readonly renamer;
    private readonly transformer;
    private reverseMap;
    constructor(renamer: (typeName: string, fieldName: string, inputFieldConfig: GraphQLInputFieldConfig) => string);
    transformSchema(originalWrappingSchema: GraphQLSchema, subschemaConfig: SubschemaConfig, transformedSchema?: GraphQLSchema): GraphQLSchema;
    transformRequest(originalRequest: Request, delegationContext: DelegationContext, transformationContext: Record<string, any>): Request;
}
