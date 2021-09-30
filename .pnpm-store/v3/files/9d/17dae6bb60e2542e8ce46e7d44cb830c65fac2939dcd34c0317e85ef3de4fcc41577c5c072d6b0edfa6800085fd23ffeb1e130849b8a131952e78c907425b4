/// <reference types="node" />
import * as stream from 'stream';
export { EndOfStreamError } from './EndOfFileStream';
export declare class StreamReader {
    private s;
    /**
     * Deferred read request
     */
    private request;
    private endOfStream;
    /**
     * Store peeked data
     * @type {Array}
     */
    private peekQueue;
    constructor(s: stream.Readable);
    /**
     * Read ahead (peek) from stream. Subsequent read or peeks will return the same data
     * @param buffer - Buffer to store data read from stream in
     * @param offset - Offset buffer
     * @param length - Number of bytes to read
     * @returns Number of bytes peeked
     */
    peek(buffer: Buffer | Uint8Array, offset: number, length: number): Promise<number>;
    /**
     * Read chunk from stream
     * @param buffer - Target buffer to store data read from stream in
     * @param offset - Offset of target buffer
     * @param length - Number of bytes to read
     * @returns Number of bytes read
     */
    read(buffer: Buffer | Uint8Array, offset: number, length: number): Promise<number>;
    /**
     * Read chunk from stream
     * @param buffer Buffer to store data read from stream in
     * @param offset Offset buffer
     * @param length Number of bytes to read
     * @returns Number of bytes read
     */
    private _read;
    private tryRead;
    private reject;
}
