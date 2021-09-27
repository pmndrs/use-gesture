/// <reference types="node" />
import { AbstractTokenizer } from './AbstractTokenizer';
import { IFileInfo, IReadChunkOptions } from './types';
export declare class FileTokenizer extends AbstractTokenizer {
    private fd;
    constructor(fd: number, fileInfo: IFileInfo);
    /**
     * Read buffer from file
     * @param buffer
     * @param options - Read behaviour options
     * @returns Promise number of bytes read
     */
    readBuffer(buffer: Buffer, options?: IReadChunkOptions): Promise<number>;
    /**
     * Peek buffer from file
     * @param buffer
     * @param options - Read behaviour options
     * @returns Promise number of bytes read
     */
    peekBuffer(buffer: Buffer, options?: IReadChunkOptions): Promise<number>;
    /**
     * @param length - Number of bytes to ignore
     * @return resolves the number of bytes ignored, equals length if this available, otherwise the number of bytes available
     */
    ignore(length: number): Promise<number>;
    close(): Promise<void>;
}
export declare function fromFile(sourceFilePath: string): Promise<FileTokenizer>;
