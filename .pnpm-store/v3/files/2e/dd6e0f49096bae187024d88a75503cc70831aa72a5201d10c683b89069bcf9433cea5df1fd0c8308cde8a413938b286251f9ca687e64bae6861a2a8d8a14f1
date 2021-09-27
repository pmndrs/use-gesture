export as namespace regexpToAst

export const VERSION: number

export class RegExpParser {
    pattern: (input: string) => RegExpPattern
}

export interface IRegExpAST {
    type: string
    loc: { begin: number; end: number }
}

export interface RegExpPattern extends IRegExpAST {
    type: "Pattern"
    flags: RegExpFlags
    value: Disjunction
}

export interface RegExpFlags extends IRegExpAST {
    type: "Flags"
    global: boolean
    ignoreCase: boolean
    multiLine: boolean
    unicode: boolean
    sticky: boolean
}

export interface Disjunction extends IRegExpAST {
    type: "Disjunction"
    value: Alternative[]
}

export interface Alternative extends IRegExpAST {
    type: "Alternative"
    value: Term[]
}

export type Term = Atom | Assertion

export interface Assertion extends IRegExpAST {
    type:
        | "StartAnchor"
        | "EndAnchor"
        | "WordBoundary"
        | "NonWordBoundary"
        | "Lookahead"
        | "NegativeLookahead"

    value?: Disjunction
}

export type Atom = Character | Set | Group | GroupBackReference

export interface Character extends IRegExpAST {
    type: "Character"
    value: number
    quantifier?: Quantifier
}

export type Range = { from: number; to: number }

export interface Set extends IRegExpAST {
    type: "Set"
    complement: boolean
    value: (number | Range)[]
    quantifier?: Quantifier
}

export interface Group extends IRegExpAST {
    type: "Group"
    value: Disjunction
    capturing: boolean
    idx?: number
    quantifier?: Quantifier
}

export interface GroupBackReference extends IRegExpAST {
    type: "GroupBackReference"
    value: number
    quantifier?: Quantifier
}

export interface Quantifier extends IRegExpAST {
    type: "Quantifier"
    atLeast: number
    atMost: number
    greedy: boolean
}

export class BaseRegExpVisitor {
    /**
     * The entry point visitor method.
     * This will dispatch to the specific visitor method.
     */
    visit(node: IRegExpAST)

    /**
     * The entry point for visiting the children of a node.
     * Override this to filter the types of children visited
     * or to support new types of children in extended ASTs.
     */
    visitChildren(node: IRegExpAST)

    /**
     * The specific visitor methods
     * Override some of these of create custom visitors.
     */
    visitPattern(node: RegExpPattern)
    visitFlags(node: RegExpFlags)
    visitDisjunction(node: Disjunction)
    visitAlternative(node: Alternative)
    visitStartAnchor(node: Assertion)
    visitEndAnchor(node: Assertion)
    visitWordBoundary(node: Assertion)
    visitNonWordBoundary(node: Assertion)
    visitLookahead(node: Assertion)
    visitNegativeLookahead(node: Assertion)
    visitCharacter(node: Character)
    visitSet(node: Set)
    visitGroup(Node: Group)
    visitGroupBackReference(Node: GroupBackReference)
    visitQuantifier(Node: Quantifier)
}
