import { Item } from "./item";
import { Package } from "./package";
import { JSONValue } from "./utils";
export declare class Entrypoint extends Item<{
    main?: JSONValue;
    module?: JSONValue;
    "umd:main"?: JSONValue;
    browser?: JSONValue;
    preconstruct: {
        source?: JSONValue;
        umdName?: JSONValue;
    };
}> {
    package: Package;
    source: string;
    constructor(filePath: string, contents: string, pkg: Package, source: string);
    get name(): string;
}
