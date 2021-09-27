# Installation
> `npm install --save @types/rimraf`

# Summary
This package contains type definitions for rimraf (https://github.com/isaacs/rimraf).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/rimraf/v2.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/rimraf/v2/index.d.ts)
````ts
// Type definitions for rimraf 2.0
// Project: https://github.com/isaacs/rimraf
// Definitions by: Carlos Ballesteros Velasco <https://github.com/soywiz>
//                 e-cloud <https://github.com/e-cloud>
//                 Ruben Schmidmeister <https://github.com/bash>
//                 Oganexon <https://github.com/oganexon>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

// Imported from: https://github.com/soywiz/typescript-node-definitions/rimraf.d.ts

/// <reference types="node" />

import glob = require('glob');
import fs = require('fs');

declare function rimraf(path: string, options: rimraf.Options, callback: (error: Error) => void): void;
declare function rimraf(path: string, callback: (error: Error) => void): void;
declare namespace rimraf {
    function __promisify__(path: string, options?: Options): Promise<void>;
    function sync(path: string, options?: Options): void;
    let EMFILE_MAX: number;
    let BUSYTRIES_MAX: number;
    interface Options {
        maxBusyTries?: number | undefined;
        emfileWait?: number | undefined;
        disableGlob?: boolean | undefined;
        glob?: glob.IOptions | false | undefined;

        unlink?: typeof fs.unlink | undefined;
        chmod?: typeof fs.chmod | undefined;
        stat?: typeof fs.stat | undefined;
        lstat?: typeof fs.lstat | undefined;
        rmdir?: typeof fs.rmdir | undefined;
        readdir?: typeof fs.readdir | undefined;

        unlinkSync?: typeof fs.unlinkSync | undefined;
        chmodSync?: typeof fs.chmodSync | undefined;
        statSync?: typeof fs.statSync | undefined;
        lstatSync?: typeof fs.lstatSync | undefined;
        rmdirSync?: typeof fs.rmdirSync | undefined;
        readdirSync?: typeof fs.readdirSync | undefined;
    }
}
export = rimraf;

````

### Additional Details
 * Last updated: Wed, 07 Jul 2021 18:02:26 GMT
 * Dependencies: [@types/glob](https://npmjs.com/package/@types/glob), [@types/node](https://npmjs.com/package/@types/node)
 * Global values: none

# Credits
These definitions were written by [Carlos Ballesteros Velasco](https://github.com/soywiz), [e-cloud](https://github.com/e-cloud), [Ruben Schmidmeister](https://github.com/bash), and [Oganexon](https://github.com/oganexon).
