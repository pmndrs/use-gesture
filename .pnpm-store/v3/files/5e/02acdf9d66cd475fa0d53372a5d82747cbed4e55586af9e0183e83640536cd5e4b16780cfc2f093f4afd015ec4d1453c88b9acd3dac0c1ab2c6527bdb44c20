import { INodeManifest } from "./../redux/types";
interface INodeManifestPage {
    path?: string;
}
/**
 * This it the output after processing calls to the public unstable_createNodeManifest action
 */
interface INodeManifestOut {
    page: INodeManifestPage;
    node: {
        id: string;
    };
    foundPageBy: FoundPageBy;
    pageDataDigest: string | null;
}
declare type FoundPageBy = `ownerNodeId` | `filesystem-route-api` | `context.id` | `queryTracking` | `none`;
export declare const foundPageByToLogIds: {
    none: string;
    "context.id": string;
    queryTracking: string;
    "filesystem-route-api": string;
    ownerNodeId: string;
};
/**
 * Takes in some info about a node manifest and the page we did or didn't find for it, then warns and returns the warning string
 */
export declare function warnAboutNodeManifestMappingProblems({ inputManifest, pagePath, foundPageBy, }: {
    inputManifest: INodeManifest;
    pagePath?: string;
    foundPageBy: FoundPageBy;
}): {
    logId: string;
};
/**
 * Retrieves the content digest of a page-data.json file for use in creating node manifest files.
 */
export declare function getPageDataDigestForPagePath(pagePath?: string, directory?: string): Promise<string | null>;
/**
 * Prepares and then writes out an individual node manifest file to be used for routing to previews. Manifest files are added via the public unstable_createNodeManifest action
 */
export declare function processNodeManifest(inputManifest: INodeManifest): Promise<null | INodeManifestOut>;
/**
 * Grabs all pending node manifests, processes them, writes them to disk,
 * and then removes them from the store.
 * Manifest files are added via the public unstable_createNodeManifest action in sourceNodes
 */
export declare function processNodeManifests(): Promise<void>;
export {};
