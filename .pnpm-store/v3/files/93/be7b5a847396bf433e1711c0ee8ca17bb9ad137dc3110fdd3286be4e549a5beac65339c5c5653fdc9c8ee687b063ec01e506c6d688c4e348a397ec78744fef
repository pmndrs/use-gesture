import { GraphQLSchema } from 'graphql';
import { RootFieldFilter } from '@graphql-tools/utils';
import { SubschemaConfig, Transform } from '@graphql-tools/delegate';
export default class FilterRootFields implements Transform {
    private readonly transformer;
    constructor(filter: RootFieldFilter);
    transformSchema(originalWrappingSchema: GraphQLSchema, subschemaConfig: SubschemaConfig, transformedSchema?: GraphQLSchema): GraphQLSchema;
}
