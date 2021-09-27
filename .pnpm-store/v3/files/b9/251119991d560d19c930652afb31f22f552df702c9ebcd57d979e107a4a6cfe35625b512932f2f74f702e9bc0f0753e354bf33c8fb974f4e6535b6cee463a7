export enum LevaErrors {
  UNSUPPORTED_INPUT,
  NO_COMPONENT_FOR_TYPE,
  UNKNOWN_INPUT,
  DUPLICATE_KEYS,
  ALREADY_REGISTERED_TYPE,
  CLIPBOARD_ERROR,
  THEME_ERROR,
  PATH_DOESNT_EXIST,
  INPUT_TYPE_OVERRIDE,
  EMPTY_KEY,
}

const ErrorList = {
  [LevaErrors.UNSUPPORTED_INPUT]: (type: string, path: string) => [
    `An input with type \`${type}\` input was found at path \`${path}\` but it's not supported yet.`,
  ],
  [LevaErrors.NO_COMPONENT_FOR_TYPE]: (type: string, path: string) => [
    `Type \`${type}\` found at path \`${path}\` can't be displayed in panel because no component supports it yet.`,
  ],
  [LevaErrors.UNKNOWN_INPUT]: (path: string, value: unknown) => [`input at path \`${path}\` is not recognized.`, value],
  [LevaErrors.DUPLICATE_KEYS]: (key: string, path: string, prevPath: string) => [
    `Key \`${key}\` of path \`${path}\` already exists at path \`${prevPath}\`. Even nested keys need to be unique. Rename one of the keys.`,
  ],
  [LevaErrors.ALREADY_REGISTERED_TYPE]: (type: string) => [
    `Type ${type} has already been registered. You can't register a component with the same type.`,
  ],
  [LevaErrors.CLIPBOARD_ERROR]: (value: unknown) => [`Error copying the value`, value],
  [LevaErrors.THEME_ERROR]: (category: string, key: string) => [
    `Error accessing the theme \`${category}.${key}\` value.`,
  ],
  [LevaErrors.PATH_DOESNT_EXIST]: (path: string) => [
    `Error getting the value at path \`${path}\`. There is probably an error in your \`render\` function.`,
  ],
  [LevaErrors.PATH_DOESNT_EXIST]: (path: string) => [`Error accessing the value at path \`${path}\``],
  [LevaErrors.INPUT_TYPE_OVERRIDE]: (path: string, type: string, wrongType: string) => [
    `Input at path \`${path}\` already exists with type: \`${type}\`. Its type cannot be overridden with type \`${wrongType}\`.`,
  ],
  [LevaErrors.EMPTY_KEY]: () => ['Keys can not be empty, if you want to hide a label use whitespace.'],
}

function _log<T extends LevaErrors>(fn: 'log' | 'warn', errorType: T, ...args: Parameters<typeof ErrorList[T]>) {
  //@ts-expect-error
  const [message, ...rest] = ErrorList[errorType](...args)
  // eslint-disable-next-line no-console
  console[fn]('LEVA: ' + message, ...rest)
}

// @ts-expect-error
export const warn = _log.bind(null, 'warn')
// @ts-expect-error
export const log = _log.bind(null, 'log')
