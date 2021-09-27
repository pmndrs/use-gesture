"use strict";
/* istanbul ignore next */ var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.EarlyExitException = exports.NotAllInputParsedException = exports.NoViableAltException = exports.MismatchedTokenException = exports.isRecognitionException = void 0;
var utils_1 = require("@chevrotain/utils");
var MISMATCHED_TOKEN_EXCEPTION = "MismatchedTokenException";
var NO_VIABLE_ALT_EXCEPTION = "NoViableAltException";
var EARLY_EXIT_EXCEPTION = "EarlyExitException";
var NOT_ALL_INPUT_PARSED_EXCEPTION = "NotAllInputParsedException";
var RECOGNITION_EXCEPTION_NAMES = [
    MISMATCHED_TOKEN_EXCEPTION,
    NO_VIABLE_ALT_EXCEPTION,
    EARLY_EXIT_EXCEPTION,
    NOT_ALL_INPUT_PARSED_EXCEPTION
];
Object.freeze(RECOGNITION_EXCEPTION_NAMES);
// hacks to bypass no support for custom Errors in javascript/typescript
function isRecognitionException(error) {
    // can't do instanceof on hacked custom js exceptions
    return utils_1.contains(RECOGNITION_EXCEPTION_NAMES, error.name);
}
exports.isRecognitionException = isRecognitionException;
var RecognitionException = /** @class */ (function (_super) {
    __extends(RecognitionException, _super);
    function RecognitionException(message, token) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) /* istanbul ignore next */ || this;
        _this.token = token;
        _this.resyncedTokens = [];
        // fix prototype chain when typescript target is ES5
        Object.setPrototypeOf(_this, _newTarget.prototype);
        /* istanbul ignore next - V8 workaround to remove constructor from stacktrace when typescript target is ES5 */
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, _this.constructor);
        }
        return _this;
    }
    return RecognitionException;
}(Error));
var MismatchedTokenException = /** @class */ (function (_super) {
    __extends(MismatchedTokenException, _super);
    function MismatchedTokenException(message, token, previousToken) {
        var _this = _super.call(this, message, token) /* istanbul ignore next */ || this;
        _this.previousToken = previousToken;
        _this.name = MISMATCHED_TOKEN_EXCEPTION;
        return _this;
    }
    return MismatchedTokenException;
}(RecognitionException));
exports.MismatchedTokenException = MismatchedTokenException;
var NoViableAltException = /** @class */ (function (_super) {
    __extends(NoViableAltException, _super);
    function NoViableAltException(message, token, previousToken) {
        var _this = _super.call(this, message, token) /* istanbul ignore next */ || this;
        _this.previousToken = previousToken;
        _this.name = NO_VIABLE_ALT_EXCEPTION;
        return _this;
    }
    return NoViableAltException;
}(RecognitionException));
exports.NoViableAltException = NoViableAltException;
var NotAllInputParsedException = /** @class */ (function (_super) {
    __extends(NotAllInputParsedException, _super);
    function NotAllInputParsedException(message, token) {
        var _this = _super.call(this, message, token) /* istanbul ignore next */ || this;
        _this.name = NOT_ALL_INPUT_PARSED_EXCEPTION;
        return _this;
    }
    return NotAllInputParsedException;
}(RecognitionException));
exports.NotAllInputParsedException = NotAllInputParsedException;
var EarlyExitException = /** @class */ (function (_super) {
    __extends(EarlyExitException, _super);
    function EarlyExitException(message, token, previousToken) {
        var _this = _super.call(this, message, token) /* istanbul ignore next */ || this;
        _this.previousToken = previousToken;
        _this.name = EARLY_EXIT_EXCEPTION;
        return _this;
    }
    return EarlyExitException;
}(RecognitionException));
exports.EarlyExitException = EarlyExitException;
//# sourceMappingURL=exceptions_public.js.map