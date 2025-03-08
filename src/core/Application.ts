import { Hono } from "hono";
import type { RouteMetadata, ServerOptions } from "../types";
import { defaultOptions } from "../utils/constants";
import { controllerMetadata, routeMetadata } from "../utils/meta-data";
import { Container } from "../di/Container";

export class Application {
    private readonly app: Hono;
    private readonly options: ServerOptions;

    constructor(app: Hono, options: ServerOptions) {
        this.app = app;
        this.options = { ...defaultOptions, ...options };
    }

    public static initialize(app: Hono, options: ServerOptions): Application {
        const instance = new Application(app, options);
        instance.registerControllers();
        return instance;
    }

    private registerControllers(): void {
        const baseGroup = new Hono();
        for (const Controller of this.options.controllers ?? []) {
            const controllerPath = this.getControllerPath(Controller);
            const routes = routeMetadata.get(Controller) ?? [];
            const instance = Container.resolve(Controller);

            const controllerGroup = new Hono();

            for (const route of routes) {
                this.registerRoute(controllerGroup, route, instance);
            }
            baseGroup.route(controllerPath, controllerGroup);
        }

        this.app.route(this.options.basePath ?? '', baseGroup);
    }
    private getControllerPath(Controller: any): string {
        const path = controllerMetadata.get(Controller) ?? "";
        return path.replace(/\/$/, ""); // Normalize trailing slash
    }

    private registerRoute(
        group: Hono,
        route: RouteMetadata,
        instance: any
    ): void {
        const { method, path, handler } = route;
        const normalizedPath = path === "/" ? "" : path;

        group.on(
            method.toUpperCase(),
            normalizedPath,
            async (c) => {
                try {
                    // Ensure proper 'this' context
                    const boundHandler = instance[handler].bind(instance);
                    return await boundHandler(c);
                } catch (error) {
                    throw error;
                }
            }
        );
    }


}