export const defaultPrefix = "id";

export function generateRandomString(prefix = defaultPrefix) {
  return `${prefix ? `${prefix}-` : ""}${Math.random()
    .toString(32)
    .substr(2, 6)}`;
}
