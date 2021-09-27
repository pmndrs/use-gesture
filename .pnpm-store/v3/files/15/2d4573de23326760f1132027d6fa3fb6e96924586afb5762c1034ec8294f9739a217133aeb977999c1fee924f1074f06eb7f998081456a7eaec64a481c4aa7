"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromFile = exports.FileTokenizer = void 0;
const AbstractTokenizer_1 = require("./AbstractTokenizer");
const peek_readable_1 = require("peek-readable");
const fs = require("./FsPromise");
class FileTokenizer extends AbstractTokenizer_1.AbstractTokenizer {
    constructor(fd, fileInfo) {
        super(fileInfo);
        this.fd = fd;
    }
    /**
     * Read buffer from file
     * @param buffer
     * @param options - Read behaviour options
     * @returns Promise number of bytes read
     */
    async readBuffer(buffer, options) {
        let offset = 0;
        let length = buffer.length;
        if (options) {
            if (options.position) {
                if (options.position < this.position) {
                    throw new Error('`options.position` must be equal or greater than `tokenizer.position`');
                }
                this.position = options.position;
            }
            if (Number.isInteger(options.length)) {
                length = options.length;
            }
            else {
                length -= options.offset || 0;
            }
            if (options.offset) {
                offset = options.offset;
            }
        }
        if (length === 0) {
            return Promise.resolve(0);
        }
        const res = await fs.read(this.fd, buffer, offset, length, this.position);
        this.position += res.bytesRead;
        if (res.bytesRead < length && (!options || !options.mayBeLess)) {
            throw new peek_readable_1.EndOfStreamError();
        }
        return res.bytesRead;
    }
    /**
     * Peek buffer from file
     * @param buffer
     * @param options - Read behaviour options
     * @returns Promise number of bytes read
     */
    async peekBuffer(buffer, options) {
        let offset = 0;
        let length = buffer.length;
        let position = this.position;
        if (options) {
            if (options.position) {
                if (options.position < this.position) {
                    throw new Error('`options.position` must be equal or greater than `tokenizer.position`');
                }
                position = options.position;
            }
            if (Number.isInteger(options.length)) {
                length = options.length;
            }
            else {
                length -= options.offset || 0;
            }
            if (options.offset) {
                offset = options.offset;
            }
        }
        if (length === 0) {
            return Promise.resolve(0);
        }
        const res = await fs.read(this.fd, buffer, offset, length, position);
        if ((!options || !options.mayBeLess) && res.bytesRead < length) {
            throw new peek_readable_1.EndOfStreamError();
        }
        return res.bytesRead;
    }
    /**
     * @param length - Number of bytes to ignore
     * @return resolves the number of bytes ignored, equals length if this available, otherwise the number of bytes available
     */
    async ignore(length) {
        const bytesLeft = this.fileInfo.size - this.position;
        if (length <= bytesLeft) {
            this.position += length;
            return length;
        }
        else {
            this.position += bytesLeft;
            return bytesLeft;
        }
    }
    async close() {
        return fs.close(this.fd);
    }
}
exports.FileTokenizer = FileTokenizer;
async function fromFile(sourceFilePath) {
    const stat = await fs.stat(sourceFilePath);
    if (!stat.isFile) {
        throw new Error(`File not a file: ${sourceFilePath}`);
    }
    const fd = await fs.open(sourceFilePath, 'r');
    return new FileTokenizer(fd, { path: sourceFilePath, size: stat.size });
}
exports.fromFile = fromFile;
