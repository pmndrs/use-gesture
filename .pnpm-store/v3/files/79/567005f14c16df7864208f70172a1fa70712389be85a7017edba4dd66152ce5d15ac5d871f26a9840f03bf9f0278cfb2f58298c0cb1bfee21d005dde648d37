export declare class Store {
    bufferFilePath: string;
    baseDir: string;
    eventsJsonFileName: string;
    constructor(baseDir: string);
    appendToBuffer(event: unknown): void;
    flushFile(filePath: string, flushOperation: (contents: string) => Promise<boolean>): Promise<boolean>;
    startFlushEvents(flushOperation: (contents: string) => Promise<boolean>): Promise<boolean>;
}
