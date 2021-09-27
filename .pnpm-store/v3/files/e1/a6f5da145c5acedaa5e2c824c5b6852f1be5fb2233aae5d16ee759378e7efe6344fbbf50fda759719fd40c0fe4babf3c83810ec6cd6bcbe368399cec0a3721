import { Package } from "@manypkg/get-packages";
declare function add(pathToFile: string, cwd: string): Promise<boolean>;
declare function commit(message: string, cwd: string): Promise<boolean>;
declare function tag(tagStr: string, cwd: string): Promise<boolean>;
export declare function getDivergedCommit(cwd: string, ref: string): Promise<string>;
declare const getCommitThatAddsFile: (gitPath: string, cwd: string) => Promise<string | undefined>;
/**
 * Get the short SHAs for the commits that added files, including automatically
 * extending a shallow clone if necessary to determine any commits.
 * @param gitPaths - Paths to fetch
 * @param cwd - Location of the repository
 */
declare function getCommitsThatAddFiles(gitPaths: string[], cwd: string): Promise<(string | undefined)[]>;
declare function getChangedFilesSince({ cwd, ref, fullPath }: {
    cwd: string;
    ref: string;
    fullPath?: boolean;
}): Promise<Array<string>>;
declare function getChangedChangesetFilesSinceRef({ cwd, ref }: {
    cwd: string;
    ref: string;
}): Promise<Array<string>>;
declare function getChangedPackagesSinceRef({ cwd, ref }: {
    cwd: string;
    ref: string;
}): Promise<Package[]>;
export { getCommitThatAddsFile, getCommitsThatAddFiles, getChangedFilesSince, add, commit, tag, getChangedPackagesSinceRef, getChangedChangesetFilesSinceRef };
