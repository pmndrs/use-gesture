import { GraphQLFieldConfig, GraphQLFieldResolver, GraphQLFieldConfigArgumentMap, GraphQLEnumType } from "gatsby/graphql";
export declare const ImageFormatType: GraphQLEnumType;
export declare const ImageLayoutType: GraphQLEnumType;
export declare const ImagePlaceholderType: GraphQLEnumType;
export interface IGatsbyGraphQLFieldConfig<TSource, TContext, TArgs> {
    description?: string;
    type: string;
    args?: Record<string, IGatsbyGraphQLResolverArgumentConfig>;
    resolve: GraphQLFieldResolver<TSource, TContext, TArgs>;
}
export interface IGatsbyGraphQLResolverArgumentConfig<TValue = any> {
    description?: string;
    type: string | Array<string>;
    defaultValue?: TValue;
}
export declare function getGatsbyImageResolver<TSource, TContext, TArgs>(resolve: GraphQLFieldResolver<TSource, TContext, TArgs>, extraArgs?: Record<string, IGatsbyGraphQLResolverArgumentConfig>): IGatsbyGraphQLFieldConfig<TSource, TContext, TArgs>;
export declare function getGatsbyImageFieldConfig<TSource, TContext>(resolve: GraphQLFieldResolver<TSource, TContext>, extraArgs?: GraphQLFieldConfigArgumentMap): GraphQLFieldConfig<TSource, TContext>;
