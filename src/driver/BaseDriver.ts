export abstract class BaseDriver {
    app: any;
    routePrefix: string = '';

    abstract initialize(): void;
    abstract registerRoutes(): void;
}