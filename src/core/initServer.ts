import { defaultOptions } from "../constants";
import { HonoDriver } from "../driver/HonoDriver";

export function initServer(options = defaultOptions) {
    const driver = new HonoDriver();
    driver.initialize(undefined, options);

    // return driver.app;
}