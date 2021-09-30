/// <reference types="node" />
import webpack from "webpack";
import http from "http";
import * as WorkerPool from "../utils/worker/pool";
import { WebsocketManager } from "../utils/websocket-manager";
import { CancelExperimentNoticeCallbackOrUndefined } from "../utils/show-experiment-notice";
import { Express } from "express";
import { IProgram } from "../commands/types";
declare type ActivityTracker = any;
interface IServer {
    compiler: webpack.Compiler;
    listener: http.Server;
    webpackActivity: ActivityTracker;
    cancelDevJSNotice: CancelExperimentNoticeCallbackOrUndefined;
    websocketManager: WebsocketManager;
    workerPool: WorkerPool.GatsbyWorkerPool;
    webpackWatching: IWebpackWatchingPauseResume;
}
export interface IWebpackWatchingPauseResume {
    suspend: () => void;
    resume: () => void;
}
export declare function startServer(program: IProgram, app: Express, workerPool?: WorkerPool.GatsbyWorkerPool): Promise<IServer>;
export {};
