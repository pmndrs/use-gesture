import { GraphQLExtensionDeclaration } from '../extension';
export interface Endpoint {
    url: string;
    headers?: {
        [name: string]: string | string[];
    };
    introspect?: boolean;
    subscription?: {
        url: string;
        connectionParams?: {
            [name: string]: string | undefined;
        };
    };
}
export interface Endpoints {
    [key: string]: Endpoint;
}
export declare const EndpointsExtension: GraphQLExtensionDeclaration;
//# sourceMappingURL=endpoints.d.ts.map