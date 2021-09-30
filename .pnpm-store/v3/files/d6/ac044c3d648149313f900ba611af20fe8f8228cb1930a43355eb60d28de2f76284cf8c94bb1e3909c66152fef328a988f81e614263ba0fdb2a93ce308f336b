import { Store, AnyAction } from "redux";
import * as WorkerPool from "../utils/worker/pool";
import { IGatsbyState } from "../redux/types";
import { IBuildContext } from "./types";
export declare function initialize({ program: args, parentSpan, }: IBuildContext): Promise<{
    store: Store<IGatsbyState, AnyAction>;
    workerPool: WorkerPool.GatsbyWorkerPool;
}>;
