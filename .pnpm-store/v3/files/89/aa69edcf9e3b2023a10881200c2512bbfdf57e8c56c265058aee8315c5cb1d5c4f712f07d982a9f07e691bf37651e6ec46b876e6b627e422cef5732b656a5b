import { IAddPendingTemplateDataWriteAction } from "../redux/types";
import { Server as HTTPSServer } from "https";
import { Server as HTTPServer } from "http";
import { IPageDataWithQueryResult } from "../utils/page-data";
import { Server as SocketIO, Socket } from "socket.io";
export interface IPageQueryResult {
    id: string;
    result?: IPageDataWithQueryResult;
}
export interface IStaticQueryResult {
    id: string;
    result: unknown;
}
declare type PageResultsMap = Map<string, IPageQueryResult>;
declare type QueryResultsMap = Map<string, IStaticQueryResult>;
interface IClientInfo {
    activePath: string | null;
    socket: Socket;
}
export declare class WebsocketManager {
    activePaths: Set<string>;
    clients: Set<IClientInfo>;
    errors: Map<string, string>;
    pageResults: PageResultsMap;
    staticQueryResults: QueryResultsMap;
    websocket: SocketIO | undefined;
    init: ({ server }: {
        server: HTTPSServer | HTTPServer;
    }) => SocketIO;
    getSocket: () => SocketIO | undefined;
    emitStaticQueryData: (data: IStaticQueryResult) => void;
    emitPageData: (data: IPageQueryResult) => void;
    emitError: (id: string, message?: string | undefined) => void;
    emitStalePageDataPathsFromDirtyQueryTracking(): void;
    emitStalePageDataPathsFromStaticQueriesAssignment(pendingTemplateDataWrite: IAddPendingTemplateDataWriteAction): void;
    emitStalePageDataPaths(stalePageDataPaths: Array<string>): boolean;
}
export declare const websocketManager: WebsocketManager;
export {};
