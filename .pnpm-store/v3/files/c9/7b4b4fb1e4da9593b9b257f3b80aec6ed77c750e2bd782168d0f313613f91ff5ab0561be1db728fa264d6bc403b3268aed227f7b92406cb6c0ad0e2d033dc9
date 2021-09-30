/**
 * Arabic word context checkers
 */

import { isArabicChar } from '../../../char';

function arabicWordStartCheck(contextParams) {
    const char = contextParams.current;
    const prevChar = contextParams.get(-1);
    return (
        // ? arabic first char
        (prevChar === null && isArabicChar(char)) ||
        // ? arabic char preceded with a non arabic char
        (!isArabicChar(prevChar) && isArabicChar(char))
    );
}

function arabicWordEndCheck(contextParams) {
    const nextChar = contextParams.get(1);
    return (
        // ? last arabic char
        (nextChar === null) ||
        // ? next char is not arabic
        (!isArabicChar(nextChar))
    );
}

export default {
    startCheck: arabicWordStartCheck,
    endCheck: arabicWordEndCheck
};
