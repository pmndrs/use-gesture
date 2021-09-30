/**
 * Arabic sentence context checkers
 */

import { isArabicChar, isWhiteSpace, isTashkeelArabicChar } from '../../../char';

function arabicSentenceStartCheck(contextParams) {
    const char = contextParams.current;
    const prevChar = contextParams.get(-1);
    return (
        // ? an arabic char preceded with a non arabic char
        (isArabicChar(char) || isTashkeelArabicChar(char)) &&
        !isArabicChar(prevChar)
    );
}

function arabicSentenceEndCheck(contextParams) {
    const nextChar = contextParams.get(1);
    switch (true) {
        case nextChar === null:
            return true;
        case (!isArabicChar(nextChar) && !isTashkeelArabicChar(nextChar)):
            const nextIsWhitespace = isWhiteSpace(nextChar);
            if (!nextIsWhitespace) return true;
            if (nextIsWhitespace) {
                let arabicCharAhead = false;
                arabicCharAhead = (
                    contextParams.lookahead.some(
                        c => isArabicChar(c) || isTashkeelArabicChar(c)
                    )
                );
                if (!arabicCharAhead) return true;
            }
            break;
        default:
            return false;
    }
}

export default {
    startCheck: arabicSentenceStartCheck,
    endCheck: arabicSentenceEndCheck
};
