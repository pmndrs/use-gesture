import { JSONValue } from "./utils";
declare type JSONDataByPath = Map<string, {
    value: JSONValue;
    stringifiedSaved: string;
}>;
declare type BaseConfig = Record<string, JSONValue | undefined> & {
    preconstruct?: JSONValue;
};
export declare class Item<JSONData extends BaseConfig = BaseConfig> {
    path: string;
    indent: string;
    directory: string;
    _jsonDataByPath: JSONDataByPath;
    constructor(filePath: string, contents: string, jsonDataByPath: JSONDataByPath);
    get json(): JSONData;
    set json(value: JSONData);
    save(): Promise<boolean>;
}
export {};
