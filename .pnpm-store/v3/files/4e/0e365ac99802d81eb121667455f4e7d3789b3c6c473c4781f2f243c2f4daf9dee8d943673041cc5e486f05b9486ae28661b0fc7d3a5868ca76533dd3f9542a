import { IGroupedQueryIds } from "../../services";
import { GatsbyWorkerPool } from "./types";
export type { GatsbyWorkerPool };
export declare const create: () => GatsbyWorkerPool;
export declare function runQueriesInWorkersQueue(pool: GatsbyWorkerPool, queryIds: IGroupedQueryIds, chunkSize?: number): Promise<void>;
export declare function mergeWorkerState(pool: GatsbyWorkerPool): Promise<void>;
