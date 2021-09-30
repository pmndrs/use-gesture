import { Item } from "./item";
import { Package } from "./package";
import { JSONValue } from "./utils";
export declare class Project extends Item<{
    name?: JSONValue;
    workspaces?: JSONValue;
    preconstruct: {
        globals?: Record<string, string>;
        packages?: JSONValue;
        distFilenameStrategy?: JSONValue;
        ___experimentalFlags_WILL_CHANGE_IN_PATCH: {
            logCompiledFiles?: JSONValue;
            typeScriptProxyFileWithImportEqualsRequireAndExportEquals?: JSONValue;
            keepDynamicImportAsDynamicImportInCommonJS?: JSONValue;
        };
    };
}> {
    get experimentalFlags(): {
        logCompiledFiles: boolean;
        typeScriptProxyFileWithImportEqualsRequireAndExportEquals: boolean;
        keepDynamicImportAsDynamicImportInCommonJS: boolean;
    };
    get configPackages(): Array<string>;
    static create(_directory: string, isFix?: boolean): Promise<Project>;
    get name(): string;
    packages: Array<Package>;
    _packages(isFix: boolean): Promise<Array<Package>>;
}
