export const join = (...args: (string | undefined)[]) => args.filter(Boolean).join('.')

export const prefix = (obj: object, p: string) =>
  Object.entries(obj).reduce((acc, [key, v]) => ({ ...acc, [join(p, key)]: v }), {})

export function getKeyPath(path: string): [string, string | undefined] {
  const dir = path.split('.')
  return [dir.pop()!, dir.join('.') || undefined]
}
