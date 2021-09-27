import { Project } from "./project";
import { Entrypoint } from "./entrypoint";
export declare const isFieldValid: {
    main(entrypoint: Entrypoint): boolean;
    module(entrypoint: Entrypoint): boolean;
    "umd:main"(entrypoint: Entrypoint): boolean;
    browser(entrypoint: Entrypoint): boolean;
};
export declare function isUmdNameSpecified(entrypoint: Entrypoint): boolean;
export declare const FORMER_FLAGS_THAT_ARE_ENABLED_NOW: Set<string>;
export declare const EXPERIMENTAL_FLAGS: Set<string>;
export declare function validateProject(project: Project, log?: boolean): void;
export default function validate(directory: string): Promise<void>;
