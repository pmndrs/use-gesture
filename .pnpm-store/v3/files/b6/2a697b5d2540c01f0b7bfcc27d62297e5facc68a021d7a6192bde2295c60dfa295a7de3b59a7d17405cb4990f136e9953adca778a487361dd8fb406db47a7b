"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dedent = dedent;

// Flow

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
function dedent(strings, ...values) {
  // $FlowFixMe: Flow doesn't undestand .raw
  const raw = typeof strings === 'string' ? [strings] : strings.raw; // first, perform interpolation

  let result = '';

  for (let i = 0; i < raw.length; i++) {
    result += raw[i] // join lines when there is a suppressed newline
    .replace(/\\\n[ \t]*/g, '') // handle escaped backticks
    .replace(/\\`/g, '`');

    if (i < values.length) {
      result += values[i];
    }
  } // now strip indentation


  const lines = result.split('\n');
  let mindent = null;
  lines.forEach(l => {
    const m = l.match(/^(\s+)\S+/);

    if (m) {
      const indent = m[1].length;

      if (!mindent) {
        // this is the first indented line
        mindent = indent;
      } else {
        mindent = Math.min(mindent, indent);
      }
    }
  });

  if (mindent !== null) {
    const m = mindent; // appease Flow

    result = lines.map(l => l[0] === ' ' ? l.slice(m) : l).join('\n');
  }

  return result // dedent eats leading and trailing whitespace too
  .trim() // handle escaped newlines at the end to ensure they don't get stripped too
  .replace(/\\n/g, '\n');
}