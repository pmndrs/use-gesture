import { GraphQLSchema } from 'graphql';
import { PruneSchemaOptions } from '@graphql-tools/utils';
import { SubschemaConfig, Transform } from '@graphql-tools/delegate';
export default class PruneTypes implements Transform {
    private readonly options;
    constructor(options?: PruneSchemaOptions);
    transformSchema(originalWrappingSchema: GraphQLSchema, _subschemaConfig: SubschemaConfig, _transformedSchema?: GraphQLSchema): GraphQLSchema;
}
