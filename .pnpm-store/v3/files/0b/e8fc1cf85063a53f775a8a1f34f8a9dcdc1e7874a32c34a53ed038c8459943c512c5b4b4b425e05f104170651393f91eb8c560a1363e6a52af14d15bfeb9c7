import { GraphQLSchema } from 'graphql';
import { SubschemaConfig, Transform } from '@graphql-tools/delegate';
export default class RemoveObjectFieldsWithDeprecation implements Transform {
    private readonly transformer;
    constructor(reason: string | RegExp);
    transformSchema(originalWrappingSchema: GraphQLSchema, subschemaConfig: SubschemaConfig, transformedSchema?: GraphQLSchema): GraphQLSchema;
}
