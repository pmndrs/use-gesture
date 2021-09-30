/// <reference types="node" />
import { OutgoingHttpHeaders } from "http";
import { GatsbyCache } from "gatsby";
export interface IFetchRemoteFileOptions {
    url: string;
    cache: GatsbyCache;
    auth?: {
        htaccess_pass?: string;
        htaccess_user?: string;
    };
    httpHeaders?: OutgoingHttpHeaders;
    ext?: string;
    name?: string;
}
export declare function fetchRemoteFile({ url, cache, auth, httpHeaders, ext, name, }: IFetchRemoteFileOptions): Promise<string>;
