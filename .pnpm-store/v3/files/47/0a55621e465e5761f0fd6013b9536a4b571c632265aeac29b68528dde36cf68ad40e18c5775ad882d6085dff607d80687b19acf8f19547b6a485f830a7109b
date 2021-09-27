"use strict";
// Lookahead keys are 32Bit integers in the form
// TTTTTTTT-ZZZZZZZZZZZZ-YYYY-XXXXXXXX
// XXXX -> Occurrence Index bitmap.
// YYYY -> DSL Method Type bitmap.
// ZZZZZZZZZZZZZZZ -> Rule short Index bitmap.
// TTTTTTTTT -> alternation alternative index bitmap
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeyForAutomaticLookahead = exports.AT_LEAST_ONE_SEP_IDX = exports.MANY_SEP_IDX = exports.AT_LEAST_ONE_IDX = exports.MANY_IDX = exports.OPTION_IDX = exports.OR_IDX = exports.BITS_FOR_ALT_IDX = exports.BITS_FOR_RULE_IDX = exports.BITS_FOR_OCCURRENCE_IDX = exports.BITS_FOR_METHOD_TYPE = void 0;
exports.BITS_FOR_METHOD_TYPE = 4;
exports.BITS_FOR_OCCURRENCE_IDX = 8;
exports.BITS_FOR_RULE_IDX = 12;
// TODO: validation, this means that there may at most 2^8 --> 256 alternatives for an alternation.
exports.BITS_FOR_ALT_IDX = 8;
// short string used as part of mapping keys.
// being short improves the performance when composing KEYS for maps out of these
// The 5 - 8 bits (16 possible values, are reserved for the DSL method indices)
/* tslint:disable */
exports.OR_IDX = 1 << exports.BITS_FOR_OCCURRENCE_IDX;
exports.OPTION_IDX = 2 << exports.BITS_FOR_OCCURRENCE_IDX;
exports.MANY_IDX = 3 << exports.BITS_FOR_OCCURRENCE_IDX;
exports.AT_LEAST_ONE_IDX = 4 << exports.BITS_FOR_OCCURRENCE_IDX;
exports.MANY_SEP_IDX = 5 << exports.BITS_FOR_OCCURRENCE_IDX;
exports.AT_LEAST_ONE_SEP_IDX = 6 << exports.BITS_FOR_OCCURRENCE_IDX;
/* tslint:enable */
// this actually returns a number, but it is always used as a string (object prop key)
function getKeyForAutomaticLookahead(ruleIdx, dslMethodIdx, occurrence) {
    /* tslint:disable */
    return occurrence | dslMethodIdx | ruleIdx;
    /* tslint:enable */
}
exports.getKeyForAutomaticLookahead = getKeyForAutomaticLookahead;
var BITS_START_FOR_ALT_IDX = 32 - exports.BITS_FOR_ALT_IDX;
//# sourceMappingURL=keys.js.map