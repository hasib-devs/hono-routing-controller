export abstract class BaseDriver {
    abstract app: any;
    routePrefix: string = '';
    controllers: any[] = [];

    abstract initialize(): void;
    abstract registerRoutes(): void;
}