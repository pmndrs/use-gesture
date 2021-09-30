/**
 * Latin word context checkers
 */

import { isLatinChar } from '../../../char';

function latinWordStartCheck(contextParams) {
    const char = contextParams.current;
    const prevChar = contextParams.get(-1);
    return (
        // ? latin first char
        (prevChar === null && isLatinChar(char)) ||
        // ? latin char preceded with a non latin char
        (!isLatinChar(prevChar) && isLatinChar(char))
    );
}

function latinWordEndCheck(contextParams) {
    const nextChar = contextParams.get(1);
    return (
        // ? last latin char
        (nextChar === null) ||
        // ? next char is not latin
        (!isLatinChar(nextChar))
    );
}

export default {
    startCheck: latinWordStartCheck,
    endCheck: latinWordEndCheck
};
