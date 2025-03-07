import { defaultOptions } from "../constants";
import { HonoDriver } from "../driver/HonoDriver";

export function createServer(app: any, options = defaultOptions): void {
    const driver = new HonoDriver();

    driver.initialize(app, options);
}