import { RegExpParser, RegExpPattern } from "regexp-to-ast"

let regExpAstCache = {}
const regExpParser = new RegExpParser()

export function getRegExpAst(regExp: RegExp): RegExpPattern {
  const regExpStr = regExp.toString()
  if (regExpAstCache.hasOwnProperty(regExpStr)) {
    return regExpAstCache[regExpStr]
  } else {
    const regExpAst = regExpParser.pattern(regExpStr)
    regExpAstCache[regExpStr] = regExpAst
    return regExpAst
  }
}

export function clearRegExpParserCache() {
  regExpAstCache = {}
}
