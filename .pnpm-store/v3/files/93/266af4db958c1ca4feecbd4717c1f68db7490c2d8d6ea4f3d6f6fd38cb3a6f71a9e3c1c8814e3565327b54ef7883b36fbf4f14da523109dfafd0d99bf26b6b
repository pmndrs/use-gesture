import {
  buildAlternativesLookAheadFunc,
  buildLookaheadFuncForOptionalProd,
  buildLookaheadFuncForOr,
  buildSingleAlternativeLookaheadFunction,
  PROD_TYPE
} from "../../grammar/lookahead"
import { forEach, has, isES2015MapSupported } from "@chevrotain/utils"
import {
  DEFAULT_PARSER_CONFIG,
  lookAheadSequence,
  TokenMatcher
} from "../parser"
import { IOrAlt, IParserConfig } from "@chevrotain/types"
import {
  AT_LEAST_ONE_IDX,
  AT_LEAST_ONE_SEP_IDX,
  getKeyForAutomaticLookahead,
  MANY_IDX,
  MANY_SEP_IDX,
  OPTION_IDX,
  OR_IDX
} from "../../grammar/keys"
import { MixedInParser } from "./parser_traits"
import { Rule } from "../../grammar/gast/gast_public"
import { collectMethods, getProductionDslName } from "../../grammar/gast/gast"

/**
 * Trait responsible for the lookahead related utilities and optimizations.
 */
export class LooksAhead {
  maxLookahead: number
  lookAheadFuncsCache: any
  dynamicTokensEnabled: boolean

  initLooksAhead(config: IParserConfig) {
    this.dynamicTokensEnabled = has(config, "dynamicTokensEnabled")
      ? config.dynamicTokensEnabled
      : DEFAULT_PARSER_CONFIG.dynamicTokensEnabled

    this.maxLookahead = has(config, "maxLookahead")
      ? config.maxLookahead
      : DEFAULT_PARSER_CONFIG.maxLookahead

    /* istanbul ignore next - Using plain array as dictionary will be tested on older node.js versions and IE11 */
    this.lookAheadFuncsCache = isES2015MapSupported() ? new Map() : []

    // Performance optimization on newer engines that support ES6 Map
    // For larger Maps this is slightly faster than using a plain object (array in our case).
    /* istanbul ignore else - The else branch will be tested on older node.js versions and IE11 */
    if (isES2015MapSupported()) {
      this.getLaFuncFromCache = this.getLaFuncFromMap
      this.setLaFuncCache = this.setLaFuncCacheUsingMap
    } else {
      this.getLaFuncFromCache = this.getLaFuncFromObj
      this.setLaFuncCache = this.setLaFuncUsingObj
    }
  }

  preComputeLookaheadFunctions(this: MixedInParser, rules: Rule[]): void {
    forEach(rules, (currRule) => {
      this.TRACE_INIT(`${currRule.name} Rule Lookahead`, () => {
        const {
          alternation,
          repetition,
          option,
          repetitionMandatory,
          repetitionMandatoryWithSeparator,
          repetitionWithSeparator
        } = collectMethods(currRule)

        forEach(alternation, (currProd) => {
          const prodIdx = currProd.idx === 0 ? "" : currProd.idx
          this.TRACE_INIT(`${getProductionDslName(currProd)}${prodIdx}`, () => {
            const laFunc = buildLookaheadFuncForOr(
              currProd.idx,
              currRule,
              currProd.maxLookahead || this.maxLookahead,
              currProd.hasPredicates,
              this.dynamicTokensEnabled,
              this.lookAheadBuilderForAlternatives
            )

            const key = getKeyForAutomaticLookahead(
              this.fullRuleNameToShort[currRule.name],
              OR_IDX,
              currProd.idx
            )
            this.setLaFuncCache(key, laFunc)
          })
        })

        forEach(repetition, (currProd) => {
          this.computeLookaheadFunc(
            currRule,
            currProd.idx,
            MANY_IDX,
            PROD_TYPE.REPETITION,
            currProd.maxLookahead,
            getProductionDslName(currProd)
          )
        })

        forEach(option, (currProd) => {
          this.computeLookaheadFunc(
            currRule,
            currProd.idx,
            OPTION_IDX,
            PROD_TYPE.OPTION,
            currProd.maxLookahead,
            getProductionDslName(currProd)
          )
        })

        forEach(repetitionMandatory, (currProd) => {
          this.computeLookaheadFunc(
            currRule,
            currProd.idx,
            AT_LEAST_ONE_IDX,
            PROD_TYPE.REPETITION_MANDATORY,
            currProd.maxLookahead,
            getProductionDslName(currProd)
          )
        })

        forEach(repetitionMandatoryWithSeparator, (currProd) => {
          this.computeLookaheadFunc(
            currRule,
            currProd.idx,
            AT_LEAST_ONE_SEP_IDX,
            PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR,
            currProd.maxLookahead,
            getProductionDslName(currProd)
          )
        })

        forEach(repetitionWithSeparator, (currProd) => {
          this.computeLookaheadFunc(
            currRule,
            currProd.idx,
            MANY_SEP_IDX,
            PROD_TYPE.REPETITION_WITH_SEPARATOR,
            currProd.maxLookahead,
            getProductionDslName(currProd)
          )
        })
      })
    })
  }

  computeLookaheadFunc(
    this: MixedInParser,
    rule: Rule,
    prodOccurrence: number,
    prodKey: number,
    prodType: PROD_TYPE,
    prodMaxLookahead: number,
    dslMethodName: string
  ): void {
    this.TRACE_INIT(
      `${dslMethodName}${prodOccurrence === 0 ? "" : prodOccurrence}`,
      () => {
        const laFunc = buildLookaheadFuncForOptionalProd(
          prodOccurrence,
          rule,
          prodMaxLookahead || this.maxLookahead,
          this.dynamicTokensEnabled,
          prodType,
          this.lookAheadBuilderForOptional
        )
        const key = getKeyForAutomaticLookahead(
          this.fullRuleNameToShort[rule.name],
          prodKey,
          prodOccurrence
        )
        this.setLaFuncCache(key, laFunc)
      }
    )
  }

  lookAheadBuilderForOptional(
    this: MixedInParser,
    alt: lookAheadSequence,
    tokenMatcher: TokenMatcher,
    dynamicTokensEnabled: boolean
  ): () => boolean {
    return buildSingleAlternativeLookaheadFunction(
      alt,
      tokenMatcher,
      dynamicTokensEnabled
    )
  }

  lookAheadBuilderForAlternatives(
    this: MixedInParser,
    alts: lookAheadSequence[],
    hasPredicates: boolean,
    tokenMatcher: TokenMatcher,
    dynamicTokensEnabled: boolean
  ): (orAlts?: IOrAlt<any>[]) => number | undefined {
    return buildAlternativesLookAheadFunc(
      alts,
      hasPredicates,
      tokenMatcher,
      dynamicTokensEnabled
    )
  }

  // this actually returns a number, but it is always used as a string (object prop key)
  getKeyForAutomaticLookahead(
    this: MixedInParser,
    dslMethodIdx: number,
    occurrence: number
  ): number {
    const currRuleShortName: any = this.getLastExplicitRuleShortName()
    return getKeyForAutomaticLookahead(
      currRuleShortName,
      dslMethodIdx,
      occurrence
    )
  }

  /* istanbul ignore next */
  getLaFuncFromCache(this: MixedInParser, key: number): Function {
    return undefined
  }

  getLaFuncFromMap(this: MixedInParser, key: number): Function {
    return this.lookAheadFuncsCache.get(key)
  }

  /* istanbul ignore next - Using plain array as dictionary will be tested on older node.js versions and IE11 */
  getLaFuncFromObj(this: MixedInParser, key: number): Function {
    return this.lookAheadFuncsCache[key]
  }

  /* istanbul ignore next */
  setLaFuncCache(this: MixedInParser, key: number, value: Function): void {}

  setLaFuncCacheUsingMap(
    this: MixedInParser,
    key: number,
    value: Function
  ): void {
    this.lookAheadFuncsCache.set(key, value)
  }

  /* istanbul ignore next - Using plain array as dictionary will be tested on older node.js versions and IE11 */
  setLaFuncUsingObj(this: MixedInParser, key: number, value: Function): void {
    this.lookAheadFuncsCache[key] = value
  }
}
