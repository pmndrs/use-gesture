
export type Resolver = (x: any, key: string, obj: object) => any;
export type ResolverMap = { [k: string]: Resolver | ResolverMap|boolean }

export function resolveWith<T extends { [k: string]: any }, V extends { [k: string]: any }>(config: Partial<T> = {}, resolvers: ResolverMap): V {
  const result: any = {}

  for (const [key, resolver] of Object.entries(resolvers)) switch (typeof resolver) {
    case "function": result[key] = resolver.call(result, config[key], key, config); break;
    case "object"  : result[key] = resolveWith(config[key], resolver); break;
    case "boolean" : if (resolver) result[key] = config[key]; break;
  }

  return result;
}