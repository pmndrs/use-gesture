import { TokenType } from "@chevrotain/types"
import { isUndefined } from "@chevrotain/utils"

export function classNameFromInstance(instance: any): string {
  return functionName(instance.constructor)
}

const NAME = "name"

/**
 * Utility to obtain Function names.
 * Note that there should not be an assumptions on the result of this function.
 * E.g: When running from minified source code the result may be auto generated.
 */
export function functionName(func: TokenType): string {
  // Engines that support Function.prototype.name OR the nth (n>1) time after
  // the name has been computed in the following else block.
  const existingNameProp = (<any>func).name
  /* istanbul ignore else - too many hacks for IE/old versions of node.js here*/
  if (existingNameProp) {
    return existingNameProp
  } else {
    return "anonymous"
  }
}

/**
 * @returns {boolean} - has the property been successfully defined
 */
export function defineNameProp(obj, nameValue): boolean {
  const namePropDescriptor = Object.getOwnPropertyDescriptor(obj, NAME)
  /* istanbul ignore else -> will only run in old versions of node.js */
  if (isUndefined(namePropDescriptor) || namePropDescriptor.configurable) {
    Object.defineProperty(obj, NAME, {
      enumerable: false,
      configurable: true,
      writable: false,
      value: nameValue
    })

    return true
  }
  /* istanbul ignore next -> will only run in old versions of node.js */
  return false
}
