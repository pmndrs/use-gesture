import { Entrypoint } from "./entrypoint";
import { Package } from "./package";
export declare function getNameForDistForEntrypoint(entrypoint: Entrypoint): string;
export declare function setFieldInOrder<Obj extends {
    [key: string]: any;
}, Key extends "main" | "module" | "umd:main" | "browser", Val extends any>(obj: Obj, field: Key, value: Val): Obj & {
    [k in Key]: Val;
};
export declare function getEntrypointName(pkg: Package, entrypointDir: string): any;
declare type DistFilenameStrategy = "full" | "unscoped-package-name";
export declare const validFieldsFromPkg: {
    main(pkg: Package, entrypointName: string, forceStrategy?: DistFilenameStrategy): string;
    module(pkg: Package, entrypointName: string, forceStrategy?: DistFilenameStrategy): string;
    "umd:main"(pkg: Package, entrypointName: string, forceStrategy?: DistFilenameStrategy): string;
    browser(pkg: Package, hasModuleBuild: boolean, entrypointName: string, forceStrategy?: DistFilenameStrategy): {
        [x: string]: string;
    };
};
export declare const validFields: {
    main(entrypoint: Entrypoint, forceStrategy?: DistFilenameStrategy): string;
    module(entrypoint: Entrypoint, forceStrategy?: DistFilenameStrategy): string;
    "umd:main"(entrypoint: Entrypoint, forceStrategy?: DistFilenameStrategy): string;
    browser(entrypoint: Entrypoint, forceStrategy?: DistFilenameStrategy): {
        [x: string]: string;
    };
};
export declare function flowTemplate(hasDefaultExport: boolean, relativePath: string): string;
export declare function tsTemplate(hasDefaultExport: boolean, relativePath: string): string;
export declare function overwriteDeclarationMapSourceRoot(content: string, actualSourceRoot: string): string;
export declare type JSONValue = string | number | boolean | null | Array<JSONValue> | {
    [key: string]: JSONValue | undefined;
};
export {};
