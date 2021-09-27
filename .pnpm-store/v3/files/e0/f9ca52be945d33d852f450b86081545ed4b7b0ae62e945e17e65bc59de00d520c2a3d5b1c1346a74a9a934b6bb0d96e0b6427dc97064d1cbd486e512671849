/// <reference types="node" />
import { AbstractTokenizer } from './AbstractTokenizer';
import * as Stream from 'stream';
import { IFileInfo, IReadChunkOptions } from './types';
export declare class ReadStreamTokenizer extends AbstractTokenizer {
    private streamReader;
    constructor(stream: Stream.Readable, fileInfo?: IFileInfo);
    /**
     * Get file information, an HTTP-client may implement this doing a HEAD request
     * @return Promise with file information
     */
    getFileInfo(): Promise<IFileInfo>;
    /**
     * Read buffer from tokenizer
     * @param buffer - Target buffer to fill with data read from the tokenizer-stream
     * @param options - Read behaviour options
     * @returns Promise with number of bytes read
     */
    readBuffer(buffer: Buffer | Uint8Array, options?: IReadChunkOptions): Promise<number>;
    /**
     * Peek (read ahead) buffer from tokenizer
     * @param buffer - Target buffer to write the data read to
     * @param options - Read behaviour options
     * @returns Promise with number of bytes peeked
     */
    peekBuffer(buffer: Buffer | Uint8Array, options?: IReadChunkOptions): Promise<number>;
    ignore(length: number): Promise<number>;
}
