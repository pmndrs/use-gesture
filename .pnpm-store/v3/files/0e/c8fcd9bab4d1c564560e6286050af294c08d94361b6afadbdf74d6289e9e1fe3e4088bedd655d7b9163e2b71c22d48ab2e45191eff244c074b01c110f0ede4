import { NullableMappedPosition, RawSourceMap, RawIndexMap } from "source-map";
interface ICodeFrame {
    fileName: string;
    line: number;
    column: number;
    codeFrame: string;
}
export declare const getNonGatsbyCodeFrame: ({ highlightCode, }?: {
    highlightCode?: boolean | undefined;
}) => null | ICodeFrame;
export declare const getNonGatsbyCodeFrameFormatted: ({ highlightCode }?: {
    highlightCode?: boolean | undefined;
}) => null | string;
interface IOriginalSourcePositionAndContent {
    sourcePosition: NullableMappedPosition | null;
    sourceContent: string | null;
}
export declare function findOriginalSourcePositionAndContent(webpackSource: RawSourceMap | RawIndexMap | string, position: {
    line: number;
    column: number | null;
}): Promise<IOriginalSourcePositionAndContent>;
export {};
