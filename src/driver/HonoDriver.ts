import { BaseDriver } from "./BaseDriver";

export class HonoDriver extends BaseDriver {
    constructor(public hono?: any) {
        super();

    }

    initialize(): void {
        throw new Error("Method not implemented.");
    }
    registerRoutes(): void {
        throw new Error("Method not implemented.");
    }
}