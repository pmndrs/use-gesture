export function addItemAtIndex<T extends any[]>(
  array: T,
  item: T[number],
  index: number
) {
  if (!(index in array)) {
    return [...array, item];
  }
  return [...array.slice(0, index), item, ...array.slice(index)];
}
