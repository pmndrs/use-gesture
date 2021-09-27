export const clamp = (x: number, min: number, max: number) => (x > max ? max : x < min ? min : x)
export const pad = (x: number, pad: number) => String(x).padStart(pad, '0')
export const ceil = (v: number) => Math.sign(v) * Math.ceil(Math.abs(v))
export const parseNumber = (v: number | string) => {
  if (v === '' || typeof v === 'number') return v
  try {
    const _v = evaluate(v)
    if (!isNaN(_v)) return _v
  } catch {}
  return parseFloat(v)
}

const log10 = Math.log(10)

export function getStep(number: number) {
  let n = Math.abs(+String(number).replace('.', '')) //remove decimal and make positive
  if (n === 0) return 0.01
  while (n !== 0 && n % 10 === 0) n /= 10
  //kill the 0s at the end of n
  const significantDigits = Math.floor(Math.log(n) / log10) + 1
  const numberLog = Math.floor(Math.log10(Math.abs(number)))
  const step = Math.pow(10, numberLog - significantDigits)
  return Math.max(step, 0.001)
}

export const range = (v: number, min: number, max: number) => {
  if (max === min) return 0
  return (v - min) / (max - min)
}
export const invertedRange = (p: number, min: number, max: number) => p * (max - min) + min

// from https://gist.github.com/gordonbrander/2230317
export const getUid = () => '_' + Math.random().toString(36).substr(2, 9)

const parens = /\(([0-9+\-*/^ .]+)\)/ // Regex for identifying parenthetical expressions
const exp = /(\d+(?:\.\d+)?) ?\^ ?(\d+(?:\.\d+)?)/ // Regex for identifying exponentials (x ^ y)
const mul = /(\d+(?:\.\d+)?) ?\* ?(\d+(?:\.\d+)?)/ // Regex for identifying multiplication (x * y)
const div = /(\d+(?:\.\d+)?) ?\/ ?(\d+(?:\.\d+)?)/ // Regex for identifying division (x / y)
const add = /(\d+(?:\.\d+)?) ?\+ ?(\d+(?:\.\d+)?)/ // Regex for identifying addition (x + y)
const sub = /(\d+(?:\.\d+)?) ?- ?(\d+(?:\.\d+)?)/ // Regex for identifying subtraction (x - y)

/**
 * Copyright: copied from here: https://stackoverflow.com/a/63105543
 * by @aanrudolph2 https://github.com/aanrudolph2
 *
 * Evaluates a numerical expression as a string and returns a Number
 * Follows standard PEMDAS operation ordering
 * @param {String} expr Numerical expression input
 * @returns {Number} Result of expression
 */
export function evaluate(expr: string): number {
  if (isNaN(Number(expr))) {
    if (parens.test(expr)) {
      const newExpr = expr.replace(parens, (match, subExpr) => String(evaluate(subExpr)))
      return evaluate(newExpr)
    } else if (exp.test(expr)) {
      const newExpr = expr.replace(exp, (match, base, pow) => String(Math.pow(Number(base), Number(pow))))
      return evaluate(newExpr)
    } else if (mul.test(expr)) {
      const newExpr = expr.replace(mul, (match, a, b) => String(Number(a) * Number(b)))
      return evaluate(newExpr)
    } else if (div.test(expr)) {
      const newExpr = expr.replace(div, (match, a, b) => {
        // b can equal either 0 or "0" this is on purpose
        // eslint-disable-next-line eqeqeq
        if (b != 0) return String(Number(a) / Number(b))
        else throw new Error('Division by zero')
      })
      return evaluate(newExpr)
    } else if (add.test(expr)) {
      const newExpr = expr.replace(add, (match, a: string, b: string) => String(Number(a) + Number(b)))
      return evaluate(newExpr)
    } else if (sub.test(expr)) {
      const newExpr = expr.replace(sub, (match, a, b) => String(Number(a) - Number(b)))
      return evaluate(newExpr)
    } else {
      return Number(expr)
    }
  }
  return Number(expr)
}
// Example usage
//console.log(evaluate("2 + 4*(30/5) - 34 + 45/2"));
