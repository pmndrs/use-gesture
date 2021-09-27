/// <reference types="node" />
import http from "http";
import https from "https";
import { IProgram } from "../commands/types";
export interface IProxyControls {
    serveRestartingScreen: () => void;
    serveSite: () => void;
    server: https.Server | http.Server;
}
export declare const startDevelopProxy: (input: {
    proxyPort: number;
    targetPort: number;
    program: IProgram;
}) => IProxyControls;
