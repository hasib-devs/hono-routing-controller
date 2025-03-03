import { inject } from "tsyringe";
import { AppCore } from "../core/AppCore";
import { BaseDriver } from "./BaseDriver";

export class HonoDriver extends BaseDriver {
    constructor(@inject("App") private appCore: AppCore, public app: any, public basePath?: string) {
        super();
    }

    initialize(): void {
        console.log("Hello from package again");
        // throw new Error("Method not implemented.");
    }
    registerRoutes(): void {
        throw new Error("Method not implemented.");
    }
}