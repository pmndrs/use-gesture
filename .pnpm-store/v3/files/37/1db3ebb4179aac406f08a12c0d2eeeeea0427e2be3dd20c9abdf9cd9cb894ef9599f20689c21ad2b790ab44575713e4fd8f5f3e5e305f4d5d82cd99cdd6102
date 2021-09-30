import { contains, every, has, some } from "@chevrotain/utils"
import {
  AbstractProduction,
  Alternation,
  Alternative,
  NonTerminal,
  Option,
  Repetition,
  RepetitionMandatory,
  RepetitionMandatoryWithSeparator,
  RepetitionWithSeparator,
  Rule,
  Terminal
} from "./gast_public"
import { GAstVisitor } from "./gast_visitor_public"
import { IProduction, IProductionWithOccurrence } from "@chevrotain/types"

export function isSequenceProd(prod: IProduction): boolean {
  return (
    prod instanceof Alternative ||
    prod instanceof Option ||
    prod instanceof Repetition ||
    prod instanceof RepetitionMandatory ||
    prod instanceof RepetitionMandatoryWithSeparator ||
    prod instanceof RepetitionWithSeparator ||
    prod instanceof Terminal ||
    prod instanceof Rule
  )
}

export function isOptionalProd(
  prod: IProduction,
  alreadyVisited: NonTerminal[] = []
): boolean {
  const isDirectlyOptional =
    prod instanceof Option ||
    prod instanceof Repetition ||
    prod instanceof RepetitionWithSeparator
  if (isDirectlyOptional) {
    return true
  }

  // note that this can cause infinite loop if one optional empty TOP production has a cyclic dependency with another
  // empty optional top rule
  // may be indirectly optional ((A?B?C?) | (D?E?F?))
  if (prod instanceof Alternation) {
    // for OR its enough for just one of the alternatives to be optional
    return some((<Alternation>prod).definition, (subProd: IProduction) => {
      return isOptionalProd(subProd, alreadyVisited)
    })
  } else if (prod instanceof NonTerminal && contains(alreadyVisited, prod)) {
    // avoiding stack overflow due to infinite recursion
    return false
  } else if (prod instanceof AbstractProduction) {
    if (prod instanceof NonTerminal) {
      alreadyVisited.push(prod)
    }
    return every(
      (<AbstractProduction>prod).definition,
      (subProd: IProduction) => {
        return isOptionalProd(subProd, alreadyVisited)
      }
    )
  } else {
    return false
  }
}

export function isBranchingProd(prod: IProduction): boolean {
  return prod instanceof Alternation
}

export function getProductionDslName(prod: IProductionWithOccurrence): string {
  /* istanbul ignore else */
  if (prod instanceof NonTerminal) {
    return "SUBRULE"
  } else if (prod instanceof Option) {
    return "OPTION"
  } else if (prod instanceof Alternation) {
    return "OR"
  } else if (prod instanceof RepetitionMandatory) {
    return "AT_LEAST_ONE"
  } else if (prod instanceof RepetitionMandatoryWithSeparator) {
    return "AT_LEAST_ONE_SEP"
  } else if (prod instanceof RepetitionWithSeparator) {
    return "MANY_SEP"
  } else if (prod instanceof Repetition) {
    return "MANY"
  } else if (prod instanceof Terminal) {
    return "CONSUME"
  } else {
    throw Error("non exhaustive match")
  }
}

export class DslMethodsCollectorVisitor extends GAstVisitor {
  // A minus is never valid in an identifier name
  public separator = "-"
  public dslMethods = {
    option: [],
    alternation: [],
    repetition: [],
    repetitionWithSeparator: [],
    repetitionMandatory: [],
    repetitionMandatoryWithSeparator: []
  }

  reset() {
    this.dslMethods = {
      option: [],
      alternation: [],
      repetition: [],
      repetitionWithSeparator: [],
      repetitionMandatory: [],
      repetitionMandatoryWithSeparator: []
    }
  }

  public visitTerminal(terminal: Terminal): void {
    const key = terminal.terminalType.name + this.separator + "Terminal"
    if (!has(this.dslMethods, key)) {
      this.dslMethods[key] = []
    }
    this.dslMethods[key].push(terminal)
  }

  public visitNonTerminal(subrule: NonTerminal): void {
    const key = subrule.nonTerminalName + this.separator + "Terminal"
    if (!has(this.dslMethods, key)) {
      this.dslMethods[key] = []
    }
    this.dslMethods[key].push(subrule)
  }

  public visitOption(option: Option): void {
    this.dslMethods.option.push(option)
  }

  public visitRepetitionWithSeparator(manySep: RepetitionWithSeparator): void {
    this.dslMethods.repetitionWithSeparator.push(manySep)
  }

  public visitRepetitionMandatory(atLeastOne: RepetitionMandatory): void {
    this.dslMethods.repetitionMandatory.push(atLeastOne)
  }

  public visitRepetitionMandatoryWithSeparator(
    atLeastOneSep: RepetitionMandatoryWithSeparator
  ): void {
    this.dslMethods.repetitionMandatoryWithSeparator.push(atLeastOneSep)
  }

  public visitRepetition(many: Repetition): void {
    this.dslMethods.repetition.push(many)
  }

  public visitAlternation(or: Alternation): void {
    this.dslMethods.alternation.push(or)
  }
}

const collectorVisitor = new DslMethodsCollectorVisitor()
export function collectMethods(
  rule: Rule
): {
  option: Option[]
  alternation: Alternation[]
  repetition: Repetition[]
  repetitionWithSeparator: RepetitionWithSeparator[]
  repetitionMandatory: RepetitionMandatory[]
  repetitionMandatoryWithSeparator: RepetitionMandatoryWithSeparator
} {
  collectorVisitor.reset()
  rule.accept(collectorVisitor)
  const dslMethods = collectorVisitor.dslMethods
  // avoid uncleaned references
  collectorVisitor.reset()
  return <any>dslMethods
}
