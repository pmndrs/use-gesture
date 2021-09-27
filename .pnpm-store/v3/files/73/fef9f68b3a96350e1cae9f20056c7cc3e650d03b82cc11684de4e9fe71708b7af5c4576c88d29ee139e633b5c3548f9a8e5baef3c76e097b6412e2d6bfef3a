import webpack from "webpack";
import { IWebpackWatchingPauseResume } from "../utils/start-server";
import { Span } from "opentracing";
import { IProgram, Stage } from "./types";
import { PackageJson } from "../..";
import type { GatsbyWorkerPool } from "../utils/worker/pool";
declare type IActivity = any;
export interface IBuildArgs extends IProgram {
    directory: string;
    sitePackageJson: PackageJson;
    prefixPaths: boolean;
    noUglify: boolean;
    logPages: boolean;
    writeToFile: boolean;
    profile: boolean;
    graphqlTracing: boolean;
    openTracingConfigFile: string;
    keepPageRenderer: boolean;
}
declare let devssrWebpackCompiler: webpack.Compiler;
declare let devssrWebpackWatcher: IWebpackWatchingPauseResume;
declare let needToRecompileSSRBundle: boolean;
export declare const getDevSSRWebpack: () => {
    devssrWebpackWatcher: IWebpackWatchingPauseResume;
    devssrWebpackCompiler: webpack.Compiler;
    needToRecompileSSRBundle: boolean;
};
export declare const buildRenderer: (program: IProgram, stage: Stage, parentSpan?: IActivity) => Promise<{
    rendererPath: string;
    waitForCompilerClose;
}>;
export declare const deleteRenderer: (rendererPath: string) => Promise<void>;
export interface IRenderHtmlResult {
    unsafeBuiltinsUsageByPagePath: Record<string, Array<string>>;
}
export declare const doBuildPages: (rendererPath: string, pagePaths: Array<string>, activity: IActivity, workerPool: GatsbyWorkerPool, stage: Stage) => Promise<void>;
export declare const buildHTML: ({ program, stage, pagePaths, activity, workerPool, }: {
    program: IProgram;
    stage: Stage;
    pagePaths: Array<string>;
    activity: IActivity;
    workerPool: GatsbyWorkerPool;
}) => Promise<void>;
export declare function buildHTMLPagesAndDeleteStaleArtifacts({ pageRenderer, workerPool, buildSpan, program, }: {
    pageRenderer: string;
    workerPool: GatsbyWorkerPool;
    buildSpan?: Span;
    program: IBuildArgs;
}): Promise<{
    toRegenerate: Array<string>;
    toDelete: Array<string>;
}>;
export {};
