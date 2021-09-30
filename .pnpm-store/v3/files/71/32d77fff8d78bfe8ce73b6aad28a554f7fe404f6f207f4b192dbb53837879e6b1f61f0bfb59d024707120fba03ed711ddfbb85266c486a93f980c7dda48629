declare type SearchClient = any;
export declare type Client = any;
declare type SearchResponse = any;
declare type QueryParameters = any;
interface SearchParameters {
    indexName: string;
    query: string;
    params?: QueryParameters;
}
interface GetAlgoliaSourceParams {
    searchClient: SearchClient;
    queries: SearchParameters[];
}
export declare function getAlgoliaResults({ searchClient, queries, }: GetAlgoliaSourceParams): Promise<SearchResponse['results']>;
export declare function getAlgoliaHits({ searchClient, queries, }: GetAlgoliaSourceParams): Promise<SearchResponse['hits']>;
export {};
