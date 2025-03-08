export type Constructor<T = {}> = new (...args: any[]) => T;


export type ServerOptions = {
    basePath?: string;
    controllers?: Constructor[];
    middlewares?: any[];
};

export type RouteMetadata = {
    method: string;
    path: string;
    handler: string;
};
