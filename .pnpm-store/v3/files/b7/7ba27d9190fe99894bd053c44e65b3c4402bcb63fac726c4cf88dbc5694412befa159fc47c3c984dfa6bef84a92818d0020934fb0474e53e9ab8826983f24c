/**
 * TemplateLiteral for removing leading spaces (prettifying) multiline messages.
 *
 * @example
 * const first = dedent`A string that gets so long you need to break it over
 *                      multiple lines. Luckily dedent is here to keep it
 *                      readable without lots of spaces ending up in the string
 *                      itself.`;
 * == Will return: ==
 * A string that gets so long you need to break it over
 * multiple lines. Luckily dedent is here to keep it
 * readable without lots of spaces ending up in the string
 * itself.
 *
 * @example
 * const second = dedent`
 *   Leading and trailing lines will be trimmed, so you can write something like
 *   this and have it work as you expect
 * `;
 * == Will return: ==
 * Leading and trailing lines will be trimmed, so you can write something like
 * this and have it work as you expect
 *
 * @see https://github.com/dmnd/dedent
 */
export function dedent(
  strings: string | string[] | TemplateStringsArray,
  ...values: string[]
): string;
