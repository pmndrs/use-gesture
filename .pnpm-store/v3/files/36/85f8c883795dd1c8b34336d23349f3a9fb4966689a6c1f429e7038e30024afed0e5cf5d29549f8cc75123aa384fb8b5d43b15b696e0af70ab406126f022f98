function kebabCase(string: string) {
  return string.toLowerCase().replace(/[^a-z0-9]/g, "-");
}

export function getItemId(baseId: string, value: string, id?: string) {
  return id || `${baseId}-${kebabCase(value)}`;
}
