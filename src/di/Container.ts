import type { Factory, Lifetime } from "@/types";

interface Dependency<T = any> {
    lifetime: Lifetime;
    factory: Factory<T>;
    instance?: T;
}

export class Container {
    private static dependencies = new WeakMap<object, Dependency>();

    static register<T>(
        token: object,
        factory: Factory<T>,
        scope: Lifetime = "singleton"
    ) {
        this.dependencies.set(token, { factory, lifetime: scope });
    }

    static resolve<T extends object>(token: T): T {
        try {
            const dep = this.dependencies.get(token);
            if (!dep) {
                throw new Error(`Dependency ${token} not registered`);
            }

            if (dep.lifetime === "singleton") {
                if (!dep.instance) {
                    dep.instance = dep.factory();
                }
                return dep.instance;
            }

            return dep.factory();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error resolving ${token}: ${error.message}`);
            }
            throw error;
        }
    }

    static async resolveAsync<T>(token: object): Promise<T> {
        const dep = this.dependencies.get(token);
        if (!dep) {
            throw new Error(`Dependency ${token} not found`);
        };

        if (dep.lifetime === "singleton") {
            if (!dep.instance) {
                dep.instance = await dep.factory();
            }
            return dep.instance;
        }

        return await dep.factory();
    }
}