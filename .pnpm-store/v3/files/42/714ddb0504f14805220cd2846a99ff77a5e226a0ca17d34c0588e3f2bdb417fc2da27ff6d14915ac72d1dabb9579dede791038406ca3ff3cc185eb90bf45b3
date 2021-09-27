import { GatsbyCache, Reporter, ParentSpanPluginArgs, Actions, Store } from "gatsby";
import type { FileSystemNode } from "gatsby-source-filesystem";
import { IStaticImageProps } from "../components/static-image.server";
import { ISharpGatsbyImageArgs } from "../image-utils";
export interface IImageMetadata {
    isFixed: boolean;
    contentDigest?: string;
    args: Record<string, unknown>;
    cacheFilename: string;
}
export declare function createImageNode({ fullPath, createNodeId, createNode, reporter, }: {
    fullPath: string;
    createNodeId: ParentSpanPluginArgs["createNodeId"];
    createNode: Actions["createNode"];
    reporter: Reporter;
}): Promise<FileSystemNode | undefined>;
export declare const isRemoteURL: (url: string) => boolean;
export declare function writeImages({ images, pathPrefix, cacheDir, reporter, cache, sourceDir, createNodeId, createNode, store, filename, }: {
    images: Map<string, IStaticImageProps>;
    pathPrefix: string;
    cacheDir: string;
    reporter: Reporter;
    cache: GatsbyCache;
    sourceDir: string;
    createNodeId: ParentSpanPluginArgs["createNodeId"];
    createNode: Actions["createNode"];
    store: Store;
    filename: string;
}): Promise<void>;
export declare function writeImage(file: FileSystemNode, args: ISharpGatsbyImageArgs, pathPrefix: string, reporter: Reporter, cache: GatsbyCache, filename: string): Promise<void>;
