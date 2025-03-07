import type { Context, Hono } from "hono";
import { defaultOptions } from "../constants";
import type { RoutingOptions } from "../types";

export class HonoDriver {
    app!: Hono;
    options!: RoutingOptions;;

    async initialize(instance?: Hono, options?: RoutingOptions): Promise<void> {
        this.options = { ...defaultOptions, ...options };

        if (!instance) {
            this.app = await this.createHonoInstance();
        } else {
            this.app = instance;
        }

        await this.registerRoutes();

    }

    async registerRoutes(): Promise<void> {
        const instance = await this.createHonoInstance();
        instance.get('', (ctx: Context) => {
            return ctx.json({ message: "Hello Api" });
        });

        this.app.route(this.options.basePath ?? '', instance);
    }

    async createHonoInstance(): Promise<Hono> {
        try {
            const honoModule = await import("hono");
            return new honoModule.Hono();
        } catch {
            throw new Error(
                "Hono is not installed. Please install it in your project: npm install hono"
            );
        }
    }

}