export function resolveWith(config = {}, resolvers) {
  const result = {}

  for (const [key, resolver] of Object.entries(resolvers))
    switch (typeof resolver) {
      case 'function':
        result[key] = resolver.call(result, config[key], key, config)
        break
      case 'object':
        result[key] = resolveWith(config[key], resolver)
        break
      case 'boolean':
        result[key] = config[key] ?? resolver
        break
    }

  return result
}
