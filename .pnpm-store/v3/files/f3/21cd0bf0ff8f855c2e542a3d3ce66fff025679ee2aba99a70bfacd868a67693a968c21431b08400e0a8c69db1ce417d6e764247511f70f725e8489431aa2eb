import { pick } from '.'
import { Data } from '../types'

/**
 * Takes a data object with { [path.key]: value } and returns { [key]: value }.
 * Also warns when two similar keys are being used by the user.
 *
 * @param data
 * @param paths
 * @param shouldWarn
 */
export function getValuesForPaths(data: Data, paths: string[]) {
  return Object.entries(pick(data, paths)).reduce(
    // Typescript complains that SpecialInput type doesn't have a value key.
    // But getValuesForPath is only called from paths that are inputs,
    // so they always have a value key.

    // @ts-expect-error
    (acc, [, { value, disabled, key }]) => {
      acc[key] = disabled ? undefined : value
      return acc
    },
    {} as { [path: string]: any }
  )
}
