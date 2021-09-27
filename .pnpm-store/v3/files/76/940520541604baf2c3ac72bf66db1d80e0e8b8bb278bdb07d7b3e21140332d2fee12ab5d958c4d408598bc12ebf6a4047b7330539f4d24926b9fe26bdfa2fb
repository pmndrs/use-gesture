/// <reference types="node" />
import { IFileInfo, IReadChunkOptions, ITokenizer } from './types';
import { IGetToken, IToken } from '@tokenizer/token';
export declare class BufferTokenizer implements ITokenizer {
    private buffer;
    fileInfo: IFileInfo;
    position: number;
    /**
     * Construct BufferTokenizer
     * @param buffer - Buffer to tokenize
     * @param fileInfo - Pass additional file information to the tokenizer
     */
    constructor(buffer: Buffer, fileInfo?: IFileInfo);
    /**
     * Read buffer from tokenizer
     * @param buffer
     * @param options - Read behaviour options
     * @returns {Promise<number>}
     */
    readBuffer(buffer: Buffer | Uint8Array, options?: IReadChunkOptions): Promise<number>;
    /**
     * Peek (read ahead) buffer from tokenizer
     * @param buffer
     * @param options - Read behaviour options
     * @returns {Promise<number>}
     */
    peekBuffer(buffer: Buffer | Uint8Array, options?: IReadChunkOptions): Promise<number>;
    readToken<T>(token: IGetToken<T>, position?: number): Promise<T>;
    peekToken<T>(token: IGetToken<T>, position?: number): Promise<T>;
    readNumber(token: IToken<number>): Promise<number>;
    peekNumber(token: IToken<number>): Promise<number>;
    /**
     * @return actual number of bytes ignored
     */
    ignore(length: number): Promise<number>;
    close(): Promise<void>;
}
