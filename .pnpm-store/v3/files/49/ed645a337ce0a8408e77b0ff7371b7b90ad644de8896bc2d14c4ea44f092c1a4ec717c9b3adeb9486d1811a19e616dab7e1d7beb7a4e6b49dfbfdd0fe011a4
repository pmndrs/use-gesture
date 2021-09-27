## 0.5.0 (11-12-2019)

-   [Added location to AST](https://github.com/bd82/regexp-to-ast/pull/28)
    -   Thanks to [@ConradIrwin](https://github.com/ConradIrwin) :thumbsup

## 0.4.0 (3-16-2019)

-   [Huge (x75) performance improvement](https://github.com/bd82/regexp-to-ast/pull/18).
    -   Thanks to [@morwen](https://github.com/morwen) :thumbsup

## 0.3.5 (7-12-2018)

-   A Set AST can now contain ranges of char codes as well as single char codes.
    ```typescript
    export interface Set extends IRegExpAST {
        type: "Set"
        complement: boolean
        value: (number | Range)[]
        quantifier?: Quantifier
    }
    ```

## 0.3.4 (6-16-2018)

-   Types: Set now declares a complement property.
-   Types: BaseAstVisitor now declares a visitChildren method.

## 0.3.3 (2018-6-9)

-   Types: All AST node types extend a base interface.

## 0.3.2 (2018-6-9)

-   Fixed: Visitor APIs were lacking the node argument.

## 0.3.1 (2018-6-9)

-   Added "typings" property in package.json for TypeScript consumers.
-   Fixed: Version number in regexpToAst.VERSION property.

## 0.3.0 (2018-6-9)

-   An AST Visitor class is provided to easily traverse the AST output (See main README.md)

## 0.2.4 (2018-6-6)

-   Fixed: Quantifier identifying using backtracking instead of lookahead.

## 0.2.3 (2018-6-3)

-   Fixed: Quantifier from range can be zero.

## 0.2.2 (2018-4-10)

-   VERSION constant exported.

## 0.2.1 (2018-4-10)

-   Fixed class atoms to allow syntax characters (?, +, \*, ...).
-   Fixed regular atoms to allow closing curly and square brackets.

## 0.2.0 (2018-4-7)

-   Updated npm metadata.

## 0.1.0 (2018-4-7)

-   Initial Release.
