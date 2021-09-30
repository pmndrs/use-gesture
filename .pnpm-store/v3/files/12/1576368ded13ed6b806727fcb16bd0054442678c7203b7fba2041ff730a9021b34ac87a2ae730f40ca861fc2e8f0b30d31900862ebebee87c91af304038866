import { GraphQLSchema } from 'graphql';
import { SubschemaConfig, Transform } from '@graphql-tools/delegate';
export default class FilterObjectFieldDirectives implements Transform {
    private readonly filter;
    constructor(filter: (dirName: string, dirValue: any) => boolean);
    transformSchema(originalWrappingSchema: GraphQLSchema, subschemaConfig: SubschemaConfig, transformedSchema?: GraphQLSchema): GraphQLSchema;
}
