import { HonoDriver } from "../driver/HonoDriver";
import type { RoutingOptions } from "../types";

const defaultOptions: RoutingOptions = {
    basePath: "",
    controllers: [],
    middlewares: [],
};

export function createServer(app: any, options: RoutingOptions = defaultOptions) {
    const { basePath } = options;
    const driver = new HonoDriver(app, basePath);

    driver.initialize();

    return driver.app;
}