import type { Constructor, RouteMetadata } from "@/types";

export const controllerMetadata = new WeakMap<Constructor, string>();
export const routeMetadata = new WeakMap<object, RouteMetadata[]>();
export const injectionMetadata = new WeakMap<object, unknown[]>();