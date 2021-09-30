declare type Field = "main" | "module" | "browser" | "umd:main";
export declare let errors: {
    noSource: (source: string) => string;
    deniedWriteMainField: string;
    invalidField: (field: Field, found: unknown, expected: unknown) => string;
    umdNameNotSpecified: string;
    noEntrypointPkgJson: string;
    noEntrypoints: string;
    fieldMustExistInAllEntrypointsIfExistsDeclinedFixDuringInit: (field: Field) => string;
};
export declare let confirms: {
    writeMainField: (pkg: {
        readonly name: string;
    }) => Promise<boolean>;
    writeModuleField: (pkg: {
        readonly name: string;
    }) => Promise<boolean>;
    fixModuleField: (pkg: {
        readonly name: string;
    }) => Promise<boolean>;
    fixUmdBuild: (pkg: {
        readonly name: string;
    }) => Promise<boolean>;
    fixBrowserField: (pkg: {
        readonly name: string;
    }) => Promise<boolean>;
    createEntrypointPkgJson: (pkg: {
        readonly name: string;
    }) => Promise<boolean>;
    createEntrypoint: (pkg: {
        readonly name: string;
    }) => Promise<boolean>;
};
export declare let inputs: {
    getUmdName: string;
    getSource: string;
};
export declare let infos: {
    validField: (field: Field) => string;
    validEntrypoint: string;
    validPackageEntrypoints: string;
};
export declare let successes: {
    validProject: string;
    startedWatching: string;
};
export {};
