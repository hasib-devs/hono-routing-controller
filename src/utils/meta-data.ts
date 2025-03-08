import type { RouteMetadata } from "@/types";

export const controllerMetadata = new WeakMap<Function, string>();
export const routeMetadata = new WeakMap<object, RouteMetadata[]>();
export const injectionMetadata = new WeakMap<object, unknown[]>();