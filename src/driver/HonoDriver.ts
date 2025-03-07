import type { Context } from "hono";
import { Hono } from "hono";
import { singleton } from "tsyringe";
import { defaultOptions } from "../constants";
import type { RoutingOptions } from "../types";
@singleton()
export class HonoDriver {
    app!: Hono;
    options!: RoutingOptions;;

    async initialize(instance?: Hono, options?: RoutingOptions): Promise<void> {
        this.options = { ...defaultOptions, ...options };

        if (!instance) {
            this.app = new Hono();
        } else {
            this.app = instance;
        }

        await this.registerRoutes();

    }

    private async registerRoutes(): Promise<void> {
        const hono = new Hono();
        hono.get('', (ctx: Context) => {
            return ctx.json({ message: "Hello Api" });
        });

        this.app.route(this.options.basePath ?? '', hono);
    }

}