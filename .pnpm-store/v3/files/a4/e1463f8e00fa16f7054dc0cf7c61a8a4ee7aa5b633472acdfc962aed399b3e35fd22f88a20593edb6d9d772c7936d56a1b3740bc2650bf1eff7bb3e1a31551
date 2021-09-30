import { GraphQLSchema, GraphQLFieldConfig } from 'graphql';
import { Request } from '@graphql-tools/utils';
import { Transform, DelegationContext, SubschemaConfig } from '@graphql-tools/delegate';
export default class RenameRootFields implements Transform {
    private readonly transformer;
    constructor(renamer: (operation: 'Query' | 'Mutation' | 'Subscription', name: string, fieldConfig: GraphQLFieldConfig<any, any>) => string);
    transformSchema(originalWrappingSchema: GraphQLSchema, subschemaConfig: SubschemaConfig, transformedSchema?: GraphQLSchema): GraphQLSchema;
    transformRequest(originalRequest: Request, delegationContext: DelegationContext, transformationContext: Record<string, any>): Request;
}
