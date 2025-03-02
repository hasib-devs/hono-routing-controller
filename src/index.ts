import { Hono } from "hono";
import 'reflect-metadata';
import { defaultOptions, MetadataKey } from './constants';
import { container } from "tsyringe";

type HonoMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

// create a generic type for options
export type HonoServerOptions<T> = {
    controllers?: T[];
    middlewares?: Function[];
};

export const useRoutingController = <T extends new () => any>(app: Hono, options: HonoServerOptions<T> = defaultOptions) => {
    if (options.controllers?.length) {
        options.controllers.forEach(controller => {
            const controllerPath: string = Reflect.getMetadata(MetadataKey.Controller, controller) || '';
            const instance = container.resolve<InstanceType<T>>(controller.name);

            const newApp = new Hono();

            const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(instance))
                .filter(name => name !== 'constructor');

            methods.forEach(name => {
                const routeMeta = Reflect.getMetadata(MetadataKey.Route, instance, name) as { method: HonoMethod, path: string; };
                newApp[routeMeta.method](routeMeta.path, instance[name]);
            });


            app.route(controllerPath, newApp);
        });
    }

    return app;
};


export * from './decorators/Controller';
export * from './decorators/HttpMethods';

