export declare type Resolver = (x: any, key: string, obj: object) => any;
export declare type ResolverMap = {
    [k: string]: Resolver | ResolverMap | boolean;
};
export declare function resolveWith<T extends {
    [k: string]: any;
}, V extends {
    [k: string]: any;
}>(config: Partial<T> | undefined, resolvers: ResolverMap): V;
