"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadStreamTokenizer = void 0;
const AbstractTokenizer_1 = require("./AbstractTokenizer");
const peek_readable_1 = require("peek-readable");
// import * as _debug from 'debug';
// const debug = _debug('strtok3:ReadStreamTokenizer');
const maxBufferSize = 256000;
class ReadStreamTokenizer extends AbstractTokenizer_1.AbstractTokenizer {
    constructor(stream, fileInfo) {
        super(fileInfo);
        this.streamReader = new peek_readable_1.StreamReader(stream);
    }
    /**
     * Get file information, an HTTP-client may implement this doing a HEAD request
     * @return Promise with file information
     */
    async getFileInfo() {
        return this.fileInfo;
    }
    /**
     * Read buffer from tokenizer
     * @param buffer - Target buffer to fill with data read from the tokenizer-stream
     * @param options - Read behaviour options
     * @returns Promise with number of bytes read
     */
    async readBuffer(buffer, options) {
        // const _offset = position ? position : this.position;
        // debug(`readBuffer ${_offset}...${_offset + length - 1}`);
        let offset = 0;
        let length = buffer.length;
        if (options) {
            if (Number.isInteger(options.length)) {
                length = options.length;
            }
            else {
                length -= options.offset || 0;
            }
            if (options.position) {
                const skipBytes = options.position - this.position;
                if (skipBytes > 0) {
                    await this.ignore(skipBytes);
                    return this.readBuffer(buffer, options);
                }
                else if (skipBytes < 0) {
                    throw new Error('`options.position` must be equal or greater than `tokenizer.position`');
                }
            }
            if (options.offset) {
                offset = options.offset;
            }
        }
        if (length === 0) {
            return 0;
        }
        const bytesRead = await this.streamReader.read(buffer, offset, length);
        this.position += bytesRead;
        if ((!options || !options.mayBeLess) && bytesRead < length) {
            throw new peek_readable_1.EndOfStreamError();
        }
        return bytesRead;
    }
    /**
     * Peek (read ahead) buffer from tokenizer
     * @param buffer - Target buffer to write the data read to
     * @param options - Read behaviour options
     * @returns Promise with number of bytes peeked
     */
    async peekBuffer(buffer, options) {
        // const _offset = position ? position : this.position;
        // debug(`peek ${_offset}...${_offset + length - 1}`);
        let offset = 0;
        let bytesRead;
        let length = buffer.length;
        if (options) {
            if (options.offset) {
                offset = options.offset;
            }
            if (Number.isInteger(options.length)) {
                length = options.length;
            }
            else {
                length -= options.offset || 0;
            }
            if (options.position) {
                const skipBytes = options.position - this.position;
                if (skipBytes > 0) {
                    const skipBuffer = Buffer.alloc(length + skipBytes);
                    bytesRead = await this.peekBuffer(skipBuffer, { mayBeLess: options.mayBeLess });
                    skipBuffer.copy(buffer, offset, skipBytes);
                    return bytesRead - skipBytes;
                }
                else if (skipBytes < 0) {
                    throw new Error('Cannot peek from a negative offset in a stream');
                }
            }
        }
        try {
            bytesRead = await this.streamReader.peek(buffer, offset, length);
        }
        catch (err) {
            if (options && options.mayBeLess && err instanceof peek_readable_1.EndOfStreamError) {
                return 0;
            }
            throw err;
        }
        if ((!options || !options.mayBeLess) && bytesRead < length) {
            throw new peek_readable_1.EndOfStreamError();
        }
        return bytesRead;
    }
    async ignore(length) {
        // debug(`ignore ${this.position}...${this.position + length - 1}`);
        const bufSize = Math.min(maxBufferSize, length);
        const buf = Buffer.alloc(bufSize);
        let totBytesRead = 0;
        while (totBytesRead < length) {
            const remaining = length - totBytesRead;
            const bytesRead = await this.readBuffer(buf, { length: Math.min(bufSize, remaining) });
            if (bytesRead < 0) {
                return bytesRead;
            }
            totBytesRead += bytesRead;
        }
        return totBytesRead;
    }
}
exports.ReadStreamTokenizer = ReadStreamTokenizer;
