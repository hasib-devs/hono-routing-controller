import { container } from "tsyringe";
import { defaultOptions } from "../constants";
import { HonoDriver } from "../driver/HonoDriver";

export function createServer(app: any, options = defaultOptions): void {
    // const driver = new HonoDriver();
    const driver = container.resolve(HonoDriver);

    driver.initialize(app, options);
}