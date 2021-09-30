/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Opts as ResolveOpts } from 'resolve';
import type { Config } from '@jest/types';
interface ResolverOptions extends ResolveOpts {
    basedir: Config.Path;
    browser?: boolean;
    conditions?: Array<string>;
    defaultResolver: typeof defaultResolver;
    extensions?: Array<string>;
    rootDir?: Config.Path;
}
declare global {
    namespace NodeJS {
        interface ProcessVersions {
            pnp?: any;
        }
    }
}
export default function defaultResolver(path: Config.Path, options: ResolverOptions): Config.Path;
export declare function clearDefaultResolverCache(): void;
export {};
