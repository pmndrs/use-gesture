import { Express } from "express";
declare type PluginEntry = string | {
    resolve: string;
    options?: Record<string, unknown>;
};
interface IGatsbyConfigInput {
    siteMetadata?: Record<string, unknown>;
    plugins?: Array<PluginEntry>;
    pathPrefix?: string;
    assetPrefix?: string;
    polyfill?: boolean;
    mapping?: Record<string, string>;
    proxy?: {
        prefix: string;
        url: string;
    };
    developMiddleware?(app: Express): void;
}
/**
 * Defines how a theme object is merged with the user's config
 */
export declare const mergeGatsbyConfig: (a: IGatsbyConfigInput, b: IGatsbyConfigInput) => IGatsbyConfigInput;
export {};
