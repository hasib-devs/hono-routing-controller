
import { Hono } from "hono";
import { defaultOptions } from "../constants";
import { controllerMetadata, routeMetadata } from "../meta-data";
import { Container } from "./Container";


export function createServer(app: any, options = defaultOptions): void {
    const config = { ...defaultOptions, ...options };
    const baseGroup = new Hono();

    for (const Controller of config.controllers ?? []) {
        // Get metadata
        const controllerPath = controllerMetadata.get(Controller) ?? "";
        const routes = routeMetadata.get(Controller) ?? [];

        // Resolve controller instance from container
        const instance = Container.resolve<InstanceType<typeof Controller>>(Controller);

        // Create controller-specific group
        const controllerGroup = new Hono();

        // Register routes
        for (const route of routes) {
            const { method, path, handler } = route;
            const normalizedPath = path === "/" ? "" : path;
            controllerGroup.on(
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

        baseGroup.route(controllerPath, controllerGroup);
    }

    app.route(config.basePath, baseGroup);
}