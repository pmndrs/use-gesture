import { GraphQLType, GraphQLFieldConfig } from "graphql";
import { GatsbyResolver, IGatsbyConnection, IGatsbyResolverContext } from "./type-definitions";
import { IGatsbyNode } from "../redux/types";
import { IQueryResult } from "../datastore/types";
export declare function findOne<TSource, TArgs>(typeName: string): GatsbyResolver<TSource, TArgs>;
declare type PaginatedArgs<TArgs> = TArgs & {
    skip?: number;
    limit?: number;
};
export declare function findManyPaginated<TSource, TArgs>(typeName: string): GatsbyResolver<TSource, PaginatedArgs<TArgs>>;
interface IFieldConnectionArgs {
    field: string;
}
export declare const distinct: GatsbyResolver<IGatsbyConnection<IGatsbyNode>, IFieldConnectionArgs>;
export declare const min: GatsbyResolver<IGatsbyConnection<IGatsbyNode>, IFieldConnectionArgs>;
export declare const max: GatsbyResolver<IGatsbyConnection<IGatsbyNode>, IFieldConnectionArgs>;
export declare const sum: GatsbyResolver<IGatsbyConnection<IGatsbyNode>, IFieldConnectionArgs>;
export declare const group: GatsbyResolver<IGatsbyConnection<IGatsbyNode>, PaginatedArgs<IFieldConnectionArgs>>;
export declare function paginate(results: IQueryResult, params: {
    skip?: number;
    limit?: number;
    resultOffset?: number;
}): IGatsbyConnection<IGatsbyNode>;
export declare function link<TSource, TArgs>(options: {
    by: string;
    type?: GraphQLType | undefined;
    from?: string | undefined;
    fromNode?: string | undefined;
} | undefined, fieldConfig: GraphQLFieldConfig<TSource, IGatsbyResolverContext<TSource, TArgs>, TArgs>): GatsbyResolver<TSource, TArgs>;
export declare function fileByPath<TSource, TArgs>(options: {
    from?: string | undefined;
    fromNode?: string | undefined;
} | undefined, fieldConfig: any): GatsbyResolver<TSource, TArgs>;
export declare const defaultFieldResolver: GatsbyResolver<any, any>;
export declare function wrappingResolver<TSource, TArgs>(resolver: GatsbyResolver<TSource, TArgs>): GatsbyResolver<TSource, TArgs>;
export declare const defaultResolver: GatsbyResolver<any, any>;
export {};
