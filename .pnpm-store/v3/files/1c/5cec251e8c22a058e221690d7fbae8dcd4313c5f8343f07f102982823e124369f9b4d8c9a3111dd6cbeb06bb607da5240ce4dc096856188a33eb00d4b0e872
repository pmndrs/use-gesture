import { GraphQLSchema } from 'graphql';
import { SubschemaConfig, Transform } from '@graphql-tools/delegate';
export default class RemoveObjectFieldDirectives implements Transform {
    private readonly transformer;
    constructor(directiveName: string | RegExp, args?: Record<string, any>);
    transformSchema(originalWrappingSchema: GraphQLSchema, subschemaConfig: SubschemaConfig, transformedSchema?: GraphQLSchema): GraphQLSchema;
}
