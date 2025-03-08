export type ServerOptions = {
    basePath?: string;
    controllers?: any[];
    middlewares?: any[];
};

export type RouteMetadata = {
    method: string;
    path: string;
    handler: string;
};
