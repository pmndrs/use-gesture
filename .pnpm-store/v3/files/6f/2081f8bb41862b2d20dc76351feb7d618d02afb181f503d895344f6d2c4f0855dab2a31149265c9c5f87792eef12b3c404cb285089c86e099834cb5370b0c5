import { GraphQLSchema } from 'graphql';
import { SubschemaConfig, Transform } from '@graphql-tools/delegate';
export default class RemoveObjectFieldsWithDirective implements Transform {
    private readonly directiveName;
    private readonly args;
    constructor(directiveName: string | RegExp, args?: Record<string, any>);
    transformSchema(originalWrappingSchema: GraphQLSchema, subschemaConfig: SubschemaConfig, transformedSchema?: GraphQLSchema): GraphQLSchema;
}
