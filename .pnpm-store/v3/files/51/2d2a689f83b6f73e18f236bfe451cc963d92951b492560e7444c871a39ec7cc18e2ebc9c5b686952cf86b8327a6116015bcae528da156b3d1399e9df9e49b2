"use strict";
/* istanbul ignore file - tricky to import some things from this module during testing */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = exports.createSyntaxDiagramsCode = exports.clearCache = exports.GAstVisitor = exports.serializeProduction = exports.serializeGrammar = exports.Terminal = exports.Rule = exports.RepetitionWithSeparator = exports.RepetitionMandatoryWithSeparator = exports.RepetitionMandatory = exports.Repetition = exports.Option = exports.NonTerminal = exports.Alternative = exports.Alternation = exports.defaultLexerErrorProvider = exports.NoViableAltException = exports.NotAllInputParsedException = exports.MismatchedTokenException = exports.isRecognitionException = exports.EarlyExitException = exports.defaultParserErrorProvider = exports.tokenName = exports.tokenMatcher = exports.tokenLabel = exports.EOF = exports.createTokenInstance = exports.createToken = exports.LexerDefinitionErrorType = exports.Lexer = exports.EMPTY_ALT = exports.ParserDefinitionErrorType = exports.EmbeddedActionsParser = exports.CstParser = exports.VERSION = void 0;
// semantic version
var version_1 = require("./version");
Object.defineProperty(exports, "VERSION", { enumerable: true, get: function () { return version_1.VERSION; } });
var parser_1 = require("./parse/parser/parser");
Object.defineProperty(exports, "CstParser", { enumerable: true, get: function () { return parser_1.CstParser; } });
Object.defineProperty(exports, "EmbeddedActionsParser", { enumerable: true, get: function () { return parser_1.EmbeddedActionsParser; } });
Object.defineProperty(exports, "ParserDefinitionErrorType", { enumerable: true, get: function () { return parser_1.ParserDefinitionErrorType; } });
Object.defineProperty(exports, "EMPTY_ALT", { enumerable: true, get: function () { return parser_1.EMPTY_ALT; } });
var lexer_public_1 = require("./scan/lexer_public");
Object.defineProperty(exports, "Lexer", { enumerable: true, get: function () { return lexer_public_1.Lexer; } });
Object.defineProperty(exports, "LexerDefinitionErrorType", { enumerable: true, get: function () { return lexer_public_1.LexerDefinitionErrorType; } });
// Tokens utilities
var tokens_public_1 = require("./scan/tokens_public");
Object.defineProperty(exports, "createToken", { enumerable: true, get: function () { return tokens_public_1.createToken; } });
Object.defineProperty(exports, "createTokenInstance", { enumerable: true, get: function () { return tokens_public_1.createTokenInstance; } });
Object.defineProperty(exports, "EOF", { enumerable: true, get: function () { return tokens_public_1.EOF; } });
Object.defineProperty(exports, "tokenLabel", { enumerable: true, get: function () { return tokens_public_1.tokenLabel; } });
Object.defineProperty(exports, "tokenMatcher", { enumerable: true, get: function () { return tokens_public_1.tokenMatcher; } });
Object.defineProperty(exports, "tokenName", { enumerable: true, get: function () { return tokens_public_1.tokenName; } });
// Other Utilities
var errors_public_1 = require("./parse/errors_public");
Object.defineProperty(exports, "defaultParserErrorProvider", { enumerable: true, get: function () { return errors_public_1.defaultParserErrorProvider; } });
var exceptions_public_1 = require("./parse/exceptions_public");
Object.defineProperty(exports, "EarlyExitException", { enumerable: true, get: function () { return exceptions_public_1.EarlyExitException; } });
Object.defineProperty(exports, "isRecognitionException", { enumerable: true, get: function () { return exceptions_public_1.isRecognitionException; } });
Object.defineProperty(exports, "MismatchedTokenException", { enumerable: true, get: function () { return exceptions_public_1.MismatchedTokenException; } });
Object.defineProperty(exports, "NotAllInputParsedException", { enumerable: true, get: function () { return exceptions_public_1.NotAllInputParsedException; } });
Object.defineProperty(exports, "NoViableAltException", { enumerable: true, get: function () { return exceptions_public_1.NoViableAltException; } });
var lexer_errors_public_1 = require("./scan/lexer_errors_public");
Object.defineProperty(exports, "defaultLexerErrorProvider", { enumerable: true, get: function () { return lexer_errors_public_1.defaultLexerErrorProvider; } });
// grammar reflection API
var gast_public_1 = require("./parse/grammar/gast/gast_public");
Object.defineProperty(exports, "Alternation", { enumerable: true, get: function () { return gast_public_1.Alternation; } });
Object.defineProperty(exports, "Alternative", { enumerable: true, get: function () { return gast_public_1.Alternative; } });
Object.defineProperty(exports, "NonTerminal", { enumerable: true, get: function () { return gast_public_1.NonTerminal; } });
Object.defineProperty(exports, "Option", { enumerable: true, get: function () { return gast_public_1.Option; } });
Object.defineProperty(exports, "Repetition", { enumerable: true, get: function () { return gast_public_1.Repetition; } });
Object.defineProperty(exports, "RepetitionMandatory", { enumerable: true, get: function () { return gast_public_1.RepetitionMandatory; } });
Object.defineProperty(exports, "RepetitionMandatoryWithSeparator", { enumerable: true, get: function () { return gast_public_1.RepetitionMandatoryWithSeparator; } });
Object.defineProperty(exports, "RepetitionWithSeparator", { enumerable: true, get: function () { return gast_public_1.RepetitionWithSeparator; } });
Object.defineProperty(exports, "Rule", { enumerable: true, get: function () { return gast_public_1.Rule; } });
Object.defineProperty(exports, "Terminal", { enumerable: true, get: function () { return gast_public_1.Terminal; } });
// GAST Utilities
var gast_public_2 = require("./parse/grammar/gast/gast_public");
Object.defineProperty(exports, "serializeGrammar", { enumerable: true, get: function () { return gast_public_2.serializeGrammar; } });
Object.defineProperty(exports, "serializeProduction", { enumerable: true, get: function () { return gast_public_2.serializeProduction; } });
var gast_visitor_public_1 = require("./parse/grammar/gast/gast_visitor_public");
Object.defineProperty(exports, "GAstVisitor", { enumerable: true, get: function () { return gast_visitor_public_1.GAstVisitor; } });
/* istanbul ignore next */
function clearCache() {
    console.warn("The clearCache function was 'soft' removed from the Chevrotain API." +
        "\n\t It performs no action other than printing this message." +
        "\n\t Please avoid using it as it will be completely removed in the future");
}
exports.clearCache = clearCache;
var render_public_1 = require("./diagrams/render_public");
Object.defineProperty(exports, "createSyntaxDiagramsCode", { enumerable: true, get: function () { return render_public_1.createSyntaxDiagramsCode; } });
var Parser = /** @class */ (function () {
    function Parser() {
        throw new Error("The Parser class has been deprecated, use CstParser or EmbeddedActionsParser instead.\t\n" +
            "See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_7-0-0");
    }
    return Parser;
}());
exports.Parser = Parser;
//# sourceMappingURL=api.js.map