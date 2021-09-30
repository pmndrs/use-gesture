import { Package } from "../package";
import { Entrypoint } from "../entrypoint";
import { RollupOptions } from "rollup";
import { Aliases } from "./aliases";
export declare type RollupConfigType = "umd" | "browser" | "node-dev" | "node-prod";
export declare let getRollupConfig: (pkg: Package, entrypoints: Array<Entrypoint>, aliases: Aliases, type: RollupConfigType, reportTransformedFile: (filename: string) => void) => RollupOptions;
