import { GraphQLSchema } from 'graphql';
import { SubschemaConfig, Transform } from '@graphql-tools/delegate';
export default class RemoveObjectFieldDeprecations implements Transform {
    private readonly removeDirectives;
    private readonly removeDeprecations;
    constructor(reason: string | RegExp);
    transformSchema(originalWrappingSchema: GraphQLSchema, subschemaConfig: SubschemaConfig, transformedSchema?: GraphQLSchema): GraphQLSchema;
}
