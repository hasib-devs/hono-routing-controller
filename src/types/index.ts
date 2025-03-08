export type ServerOptions = {
    basePath?: string;
    controllers?: Function[];
    middlewares?: any[];
};

export type RouteMetadata = {
    method: string;
    path: string;
    handler: string;
};
