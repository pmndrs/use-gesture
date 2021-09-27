export class VFileMessage extends Error {
  /**
   * Constructor of a message for `reason` at `place` from `origin`.
   * When an error is passed in as `reason`, copies the `stack`.
   *
   * @param {string|Error} reason Reason for message (`string` or `Error`). Uses the stack and message of the error if given.
   * @param {Node|Position|Point} [place] Place at which the message occurred in a file (`Node`, `Position`, or `Point`, optional).
   * @param {string} [origin] Place in code the message originates from (`string`, optional).
   */
  constructor(
    reason: string | Error,
    place?: Node | Position | Point,
    origin?: string
  )
  /**
   * Reason for message.
   * @type {string}
   */
  reason: string
  /**
   * Starting line of error.
   * @type {number?}
   */
  line: number | null
  /**
   * Starting column of error.
   * @type {number?}
   */
  column: number | null
  /**
   * Namespace of warning.
   * @type {string?}
   */
  source: string | null
  /**
   * Category of message.
   * @type {string?}
   */
  ruleId: string | null
  /**
   * Full range information, when available.
   * Has start and end properties, both set to an object with line and column, set to number?.
   * @type {Position?}
   */
  position: Position | null
  /**
   * You may add a file property with a path of a file (used throughout the VFile ecosystem).
   * @type {string?}
   */
  file: string | null
  /**
   * If true, marks associated file as no longer processable.
   * @type {boolean?}
   */
  fatal: boolean | null
  /**
   * You may add a url property with a link to documentation for the message.
   * @type {string?}
   */
  url: string | null
  /**
   * You may add a note property with a long form description of the message (supported by vfile-reporter).
   * @type {string?}
   */
  note: string | null
}
export type Node = import('unist').Node
export type Position = import('unist').Position
export type Point = import('unist').Point
