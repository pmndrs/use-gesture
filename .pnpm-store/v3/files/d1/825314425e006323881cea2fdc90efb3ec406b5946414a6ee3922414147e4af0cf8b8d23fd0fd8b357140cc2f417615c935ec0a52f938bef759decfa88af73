import { IRenderHtmlResult } from "../../../commands/build-html";
declare global {
    namespace NodeJS {
        interface Global {
            unsafeBuiltinUsage: Array<string> | undefined;
        }
    }
}
export declare const renderHTMLProd: ({ htmlComponentRendererPath, paths, envVars, sessionId, }: {
    htmlComponentRendererPath: string;
    paths: Array<string>;
    envVars: Array<[string, string | undefined]>;
    sessionId: number;
}) => Promise<IRenderHtmlResult>;
export declare const renderHTMLDev: ({ htmlComponentRendererPath, paths, envVars, sessionId, }: {
    htmlComponentRendererPath: string;
    paths: Array<string>;
    envVars: Array<[string, string | undefined]>;
    sessionId: number;
}) => Promise<Array<unknown>>;
