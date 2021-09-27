import { GraphQLSchema } from 'graphql';
import { FieldFilter } from '@graphql-tools/utils';
import { SubschemaConfig, Transform } from '@graphql-tools/delegate';
export default class FilterInterfaceFields implements Transform {
    private readonly transformer;
    constructor(filter: FieldFilter);
    transformSchema(originalWrappingSchema: GraphQLSchema, subschemaConfig: SubschemaConfig, transformedSchema?: GraphQLSchema): GraphQLSchema;
}
