export declare type devServerOptionsType = {
    allowedHosts?: string[] | allowedHostsEnum;
    bonjour?: boolean | Record<string, any>;
    client?: false | devServerClientOptions;
    compress?: boolean;
    dev?: Record<string, any>;
    devMiddleware?: Record<string, any>;
    firewall?: boolean | string[];
    headers?: Record<string, unknown> | ((request: any, response: any, middlewareContext: any) => Record<string, any>);
    historyApiFallback?: boolean | Record<string, unknown>;
    host?: string | null | hostEnum;
    hot?: boolean | hotOptionEnum;
    http2?: boolean;
    https?: boolean | Record<string, unknown>;
    injectClient?: boolean | (() => void);
    injectHot?: boolean | (() => void);
    ipc?: string | true;
    liveReload?: boolean;
    onAfterSetupMiddleware?: () => void;
    onBeforeSetupMiddleware?: () => void;
    onListening?: () => void;
    open?: string | boolean | openOptionObject;
    openPage?: string | string[];
    overlay?: boolean | Record<string, unknown>;
    port?: number | string | null;
    profile?: boolean;
    progress?: boolean;
    proxy?: Record<string, unknown> | (Record<string, unknown> | (() => void))[];
    public?: string;
    setupExitSignals?: boolean;
    static?: boolean | string | Record<string, unknown> | (string | Record<string, unknown>)[];
    transportMode?: Record<string, unknown> | string;
    useLocalIp?: boolean;
    publicPath?: string | (() => void);
    stats?: string | boolean;
    watchFiles?: string | Record<string, unknown>;
    webSocketServer?: false | string | transportModeEnum | (() => any) | Record<string, unknown> | (Record<string, unknown> | (() => void))[];
};
declare enum hotOptionEnum {
    only = "only"
}
declare enum hostEnum {
    LocalIp = "local-ip",
    LocalIpv4 = "local-ipv4",
    LocalIpv6 = "local-ipv6"
}
declare enum allowedHostsEnum {
    Auto = "auto",
    All = "all"
}
declare enum transportModeEnum {
    SockJS = "sockjs",
    Ws = "ws"
}
declare type devServerClientOptions = {
    host?: string;
    path?: string;
    port?: string | number | null;
    needClientEntry?: boolean | (() => void);
    needHotEntry?: boolean | (() => void);
    logging?: devServerClientLogging;
    overlay?: boolean | clientOverlay;
    progress?: boolean;
    webSocketTransport?: string | transportModeEnum;
    webSocketURL?: string | webSocketURLOptions;
};
declare type webSocketURLOptions = {
    hostname?: string;
    pathname?: string;
    port?: string | number;
    password?: string;
    protocol?: string | "auto";
    username?: string;
};
declare type openOptionObject = {
    target?: string;
    app?: string;
};
declare type clientOverlay = {
    errors?: boolean;
    warnings?: boolean;
};
declare enum devServerClientLogging {
    none = "none",
    error = "error",
    warn = "warn",
    info = "info",
    log = "log",
    verbose = "verbose"
}
export {};
