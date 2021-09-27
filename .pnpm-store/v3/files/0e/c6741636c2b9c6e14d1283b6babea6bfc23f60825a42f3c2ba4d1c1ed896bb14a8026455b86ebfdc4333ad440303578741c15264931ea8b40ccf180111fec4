[![npm version](https://badge.fury.io/js/regexp-to-ast.svg)](https://badge.fury.io/js/regexp-to-ast)
[![CircleCI](https://circleci.com/gh/bd82/regexp-to-ast.svg?style=svg)](https://circleci.com/gh/bd82/regexp-to-ast)
[![Coverage Status](https://coveralls.io/repos/github/bd82/regexp-to-ast/badge.svg?branch=master)](https://coveralls.io/github/bd82/regexp-to-ast?branch=master) [![Greenkeeper badge](https://badges.greenkeeper.io/bd82/regexp-to-ast.svg)](https://greenkeeper.io/)

# regexp-to-ast

Reads a JavaScript Regular Expression **literal**(text) and outputs an Abstract Syntax Tree.

## Installation

-   npm
    ```
      npm install regexp-to-ast
    ```
-   Browser
    ```
      <script src="https://unpkg.com/regexp-to-ast/lib/parser.js"></script>
    ```

## API

The [API](https://github.com/bd82/regexp-to-ast/blob/master/api.d.ts) is defined as a TypeScript definition file.

## Usage

-   Parsing to an AST:

    ```javascript
    const RegExpParser = require("regexp-to-ast").RegExpParser
    const regexpParser = new RegExpParser.parser()

    // from a regexp text
    const astOutput = regexpParser.pattern("/a|b|c/g")

    // text from regexp instance.
    const input2 = /a|b/.toString()
    // The same parser instance can be reused
    const anotherAstOutput = regexpParser.pattern(input2)
    ```

-   Visiting the AST:

    ```javascript
    // parse to an AST as before.
    const { RegExpParser, BaseRegExpVisitor } = require("regexp-to-ast")
    const regexpParser = new RegExpParser.parser()
    const regExpAst = regexpParser.pattern("/a|b|c/g")

    // Override the visitor methods to add your logic.
    class MyRegExpVisitor extends BaseRegExpVisitor {
        visitPattern(node) {}

        visitFlags(node) {}

        visitDisjunction(node) {}

        visitAlternative(node) {}

        // Assertion
        visitStartAnchor(node) {}

        visitEndAnchor(node) {}

        visitWordBoundary(node) {}

        visitNonWordBoundary(node) {}

        visitLookahead(node) {}

        visitNegativeLookahead(node) {}

        // atoms
        visitCharacter(node) {}

        visitSet(node) {}

        visitGroup(node) {}

        visitGroupBackReference(node) {}

        visitQuantifier(node) {}
    }

    const myVisitor = new MyRegExpVisitor()
    myVisitor.visit(regExpAst)
    // extract visit results from the visitor state.
    ```

## Compatibility

This library is written in ES**5** style and is compatiable with all major browsers and **modern** node.js versions.

## TODO / Limitations

-   Use polyFill for [string.prototype.at](https://github.com/mathiasbynens/String.prototype.at)
    to support unicode characters outside BMP.
-   Descriptive error messages.
-   Position information in error messages.
-   Support unicode flag escapes.
-   Ensure edge cases described in ["The madness of parsing real world JavaScript regexps"](https://hackernoon.com/the-madness-of-parsing-real-world-javascript-regexps-d9ee336df983) are supported.
-   Support deprecated octal escapes
