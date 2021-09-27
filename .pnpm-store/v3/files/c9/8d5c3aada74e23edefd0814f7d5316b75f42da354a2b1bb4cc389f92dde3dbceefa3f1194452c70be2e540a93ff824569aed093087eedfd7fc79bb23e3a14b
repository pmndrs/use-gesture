import { Span } from "opentracing";
import webpack, { WebpackError } from "webpack";
import { IProgram } from "./types";
export declare const buildProductionBundle: (program: IProgram, parentSpan: Span) => Promise<{
    stats: webpack.Stats | Error | Array<WebpackError>;
    waitForCompilerClose: Promise<void>;
}>;
