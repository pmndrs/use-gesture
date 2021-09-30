import { Item } from "./item";
import { Entrypoint } from "./entrypoint";
import { Project } from "./project";
import { JSONValue } from "./utils";
export declare class Package extends Item<{
    name?: JSONValue;
    preconstruct: {
        entrypoints?: JSONValue;
    };
    dependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
}> {
    project: Project;
    entrypoints: Array<Entrypoint>;
    get configEntrypoints(): Array<string>;
    static create(directory: string, project: Project, isFix: boolean): Promise<Package>;
    setFieldOnEntrypoints(field: "main" | "browser" | "module" | "umd:main"): void;
    get name(): string;
}
