import { routeMetadata } from "@/utils/meta-data";

function createMethodDecorator(method: string) {
    return (path: string) => {
        return (target: object, handlerName: string) => {
            const routes = routeMetadata.get(target.constructor) ?? [];
            routes.push({ method, path, handler: handlerName });
            routeMetadata.set(target.constructor, routes);
        };
    };
}

export const Get = createMethodDecorator("GET");
export const Post = createMethodDecorator("POST");
export const Put = createMethodDecorator("PUT");
export const Delete = createMethodDecorator("DELETE");
export const Patch = createMethodDecorator("PATCH");