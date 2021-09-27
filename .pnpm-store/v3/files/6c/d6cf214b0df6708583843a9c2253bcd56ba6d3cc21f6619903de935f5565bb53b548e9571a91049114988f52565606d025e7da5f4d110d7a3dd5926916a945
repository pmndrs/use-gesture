"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractTokenizer = void 0;
const peek_readable_1 = require("peek-readable");
/**
 * Core tokenizer
 */
class AbstractTokenizer {
    constructor(fileInfo) {
        /**
         * Tokenizer-stream position
         */
        this.position = 0;
        this.numBuffer = Buffer.alloc(10);
        this.fileInfo = fileInfo ? fileInfo : {};
    }
    /**
     * Read a token from the tokenizer-stream
     * @param token - The token to read
     * @param position - If provided, the desired position in the tokenizer-stream
     * @returns Promise with token data
     */
    async readToken(token, position) {
        const buffer = Buffer.alloc(token.len);
        const len = await this.readBuffer(buffer, { position });
        if (len < token.len)
            throw new peek_readable_1.EndOfStreamError();
        return token.get(buffer, 0);
    }
    /**
     * Peek a token from the tokenizer-stream.
     * @param token - Token to peek from the tokenizer-stream.
     * @param position - Offset where to begin reading within the file. If position is null, data will be read from the current file position.
     * @returns Promise with token data
     */
    async peekToken(token, position = this.position) {
        const buffer = Buffer.alloc(token.len);
        const len = await this.peekBuffer(buffer, { position });
        if (len < token.len)
            throw new peek_readable_1.EndOfStreamError();
        return token.get(buffer, 0);
    }
    /**
     * Read a numeric token from the stream
     * @param token - Numeric token
     * @returns Promise with number
     */
    async readNumber(token) {
        const len = await this.readBuffer(this.numBuffer, { length: token.len });
        if (len < token.len)
            throw new peek_readable_1.EndOfStreamError();
        return token.get(this.numBuffer, 0);
    }
    /**
     * Read a numeric token from the stream
     * @param token - Numeric token
     * @returns Promise with number
     */
    async peekNumber(token) {
        const len = await this.peekBuffer(this.numBuffer, { length: token.len });
        if (len < token.len)
            throw new peek_readable_1.EndOfStreamError();
        return token.get(this.numBuffer, 0);
    }
    async close() {
        // empty
    }
}
exports.AbstractTokenizer = AbstractTokenizer;
