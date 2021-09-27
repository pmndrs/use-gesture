import { GraphQLSchema, GraphQLNamedType } from 'graphql';
import { SubschemaConfig, Transform } from '@graphql-tools/delegate';
export default class FilterTypes implements Transform {
    private readonly filter;
    constructor(filter: (type: GraphQLNamedType) => boolean);
    transformSchema(originalWrappingSchema: GraphQLSchema, _subschemaConfig: SubschemaConfig, _transformedSchema?: GraphQLSchema): GraphQLSchema;
}
