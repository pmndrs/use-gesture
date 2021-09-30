/// <reference types="node" />
import { RegisterOptions } from './index';
export declare function registerAndCreateEsmHooks(opts?: RegisterOptions): {
    resolve: (specifier: string, context: {
        parentURL: string;
    }, defaultResolve: any) => Promise<{
        url: string;
    }>;
    getFormat: (url: string, context: {}, defaultGetFormat: any) => Promise<{
        format: "module" | "json" | "builtin" | "commonjs" | "dynamic" | "wasm";
    }>;
    transformSource: (source: string | Buffer, context: {
        url: string;
        format: "module" | "json" | "builtin" | "commonjs" | "dynamic" | "wasm";
    }, defaultTransformSource: any) => Promise<{
        source: string | Buffer;
    }>;
};
